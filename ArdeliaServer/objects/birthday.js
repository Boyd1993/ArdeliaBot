exports.run = (client, message, args, guildConfig) => {
    const path = require('path');
    const fs = require('fs');
    const commonpaths = require(path.join(__dirname, "..", "common", "commonpaths"));
    require(commonpaths.commonMethods)();
    var birthdayJsonPath = path.join(__dirname, '..', 'savefiles', message.guild !== undefined ? message.guild.id : message.id, 'birthdays.json');
    var file = require(birthdayJsonPath);
    var BirthdayList = require(path.join(__dirname, '.', 'birthdaylist.js'));
    var birthdayList = new BirthdayList();
    birthdayList.importFile(file);
    if (args[1] === "add") {
        let day = parseInt(args[2]);
        let month = parseInt(args[3]);
        let year = parseInt(args[4]);
        if (isNaN(year)) {
            year = 99999999;
        }
        if (message.mentions.members.size !== 0 && isEditor(message.member, guildConfig)) {
            var member = message.mentions.members.first();
        }
        else {
            var member = message.member;
        }
        if (!birthdayList.checkMemberList(member.id)[0]) {
            if (validDate(day, month, year)) {
                birthdayList.add(member.id, day, month, year);
                fs.writeFile(birthdayJsonPath, JSON.stringify(birthdayList, null, ' '), (err) => {
                    message.channel.send(member.displayName + "\'s birthday is added");
                    const reloadjson = client.commands.get('reloadjsonbirthdays');
                    reloadjson.run(client, message.guild, args, guildConfig, true);
                });
            }
            else { message.channel.send('Unvalid date. Please put in a valid date with a space as separator (dd mm (yyyy). Editors: put the name of the member after the date'); }
        }
        else { message.channel.send(member.displayName + '\'s birthday already added'); }
    }

    if (args[1] === "del") {
        if (message.mentions.members.size !== 0 && isEditor(message.member, guildConfig)) {
            var member = message.mentions.members.first();
        }
        else {
            var member = message.member;
        }
        if (birthdayList.checkMemberList(member.id)[0]) {
            birthdayList.del(member.id);
            fs.writeFile(birthdayJsonPath, JSON.stringify(birthdayList, null, ' '), (err) => {
                message.channel.send(member.displayName + "\'s birthday is deleted");
                const reloadjson = client.commands.get('reloadjsonbirthdays');
                reloadjson.run(client, message.guild, args, guildConfig, true);
            });

        }
        else { message.channel.send(member.displayName + '\s birthday is not added'); }
    }

    if (args[1] === "addimg" && isEditor(message.member, guildConfig)) {
        let links = args.slice(2, args.length);
        let validLinks = links.filter(isUrl);

        birthdayList.addImages(validLinks);
        fs.writeFile(birthdayJsonPath, JSON.stringify(birthdayList, null, ' '), (err) => {
            message.channel.send(message.member.displayName + "-->" + validLinks.length + "/" + links.length + "images has been added");
            const reloadjson = client.commands.get('reloadjsonbirthdays');
            reloadjson.run(client, message.guild, args, guildConfig, true);
        });
    }

    if (args[1] === "delimg" && isEditor(message.member, guildConfig)) {
        let IDs = args.slice(2, args.length);

        let fails = birthdayList.delImages(IDs);
        fs.writeFile(birthdayJsonPath, JSON.stringify(birthdayList, null, ' '), (err) => {
            message.channel.send(message.member.displayName + "-->" + (IDs.length - fails) + "/" + IDs.length + "images has been deleted");
            const reloadjson = client.commands.get('reloadjsonbirthdays');
            reloadjson.run(client, message.guild, args, guildConfig, true);
        });
    }

    if (args[1] === 'setbirthdaymessage') {
        let newMessage = args.slice(2, args.length).join(' ');
        if (newMessage.length != 0) {
            birthdayList.set('birthdayMessage', newMessage, message, client, args, guildConfig);
        }
        else { message.channel.send("Please enter a message"); }
    }

    if (args[1] === 'setannouncechannel') {
        let newChannel = message.channel.id;
        birthdayList.set('announceChannel', newChannel, message, client, args, guildConfig);
    }

    if (args[1] === 'sethour') {
        let hour = args[2];
        if (!isNaN(hour)) {
            let newHour = parseInt(hour);
            if (newHour >= 0 && newHour <= 23) {
                birthdayList.set('announceTimeHour', newHour, message, client, args, guildConfig);
            }
            else {
                message.channel.send('Please use a valid hour in UTC time (0-23).');
            }
        }
        else {
            message.channel.send('Please use a valid hour in UTC time (0-23).');
        }
    }

    if (args[1] === 'setmin') {
        let min = args[2];
        if (!isNaN(min)) {
            let newMin = parseInt(min);
            if (newMin >= 0 && newMin <= 59) {
                birthdayList.set('announceTimeMin', newMin, message, client, args, guildConfig);
            }
            else {
                message.channel.send('Please use a valid minute in UTC (0-59).');
            }
        }
        else {
            message.channel.send('Please use a valid minute in UTC (0-59).');
        }
    }

    if (args[1] === 'setmentioneveryone') {
        let setting = args[2];
        if (setting === 'true') { birthdayList.set('tagEveryone', true, message, client, args, guildConfig); }
        else if (setting === 'false') { birthdayList.set('tagEveryone', false, message, client, args, guildConfig); }
        else { message.channel.send("Please give a valid input. Use either 'true' or 'false'") }
    }

    if (args[1] === 'setcolor') {
        let newColor = args[2];
        if (!isNaN(newColor)) {
            if (newColor > 0 && newColor <= 16777215) {
                birthdayList.set('color', newColor, message, client, args, guildConfig);
            }
            else {
                message.channel.send("Please fill in a valid color in decimals (0-16777215)");
            }
        }
        else {
            message.channel.send("Please fill in a valid color in decimals (0-16777215)");
        }
    }

    if (args[1] === "imglist") {
        birthdayList.imgList(message);
    }

    if (args[1] === "list") {
        birthdayList.list(message);
    }

    if (args[1] === "settings") {
        birthdayList.settingsList(message);
    }

    if (args[1] === "announce" && (isAdmin(message.member, guildConfig) || message.member.user.id === client.user.id) && birthdayList.getBirthdays().length != 0) {
        birthdayList.announceBirthdays(message.guild);
    }



    if (guildConfig === "index") {
        var date = new Date();
        var hour = date.getUTCHours();
        var min = date.getUTCMinutes();
        if (hour >= birthdayList.announceTimeHour && hour <= correctForTime((birthdayList.announceTimeHour + 1)) && min >= birthdayList.announceTimeMin && !birthdayList.announcedToday && birthdayList.getBirthdays().length != 0) {
            birthdayList.announceBirthdays(message);
            birthdayList.announcedToday = true;
            fs.writeFile(birthdayJsonPath, JSON.stringify(birthdayList, null, ' '), (err) => {
                const reloadjson = client.commands.get('reloadjsonbirthdays');
                reloadjson.run(client, message, args, guildConfig, true);
            });
        }
        if (hour >= correctForTime((birthdayList.announceTimeHour + 2)) && min >= birthdayList.announceTimeMin && birthdayList.announcedToday) {
            birthdayList.announcedToday = false;
            fs.writeFile(birthdayJsonPath, JSON.stringify(birthdayList, null, ' '), (err) => {
                const reloadjson = client.commands.get('reloadjsonbirthdays');
                reloadjson.run(client, message, args, guildConfig, true);
            });
        }
    }


    function correctForTime(hour) {
        if (hour >= 24) {
            hour = hour - 24
        }
        return hour;
    }
}
