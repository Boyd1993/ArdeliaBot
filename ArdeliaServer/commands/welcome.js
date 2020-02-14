exports.run = (client, message, args, guildConfig, toAnnounce) => {
    const fs = require('fs');
    const path = require('path');
    const commonpaths = require(path.join(__dirname, "..", "common", "commonpaths"));
    require(commonpaths.commonMethods)();
    const filePath = path.join(__dirname, '..', 'savefiles', message.guild.id, 'welcome.json');

    try {
        const welcomeFile = require(filePath);
        //let welcomeObj = new welcome(message.channel);
        if (welcomeFile.enabled) {
            if (args[0] === 'addmessage' && isEditor(message.member, guildConfig)) {
                let newMessage = args.splice(1, args.length);
                if (newMessage.length != 0) {
                    welcomeFile.messages.push(newMessage);
                    fs.writeFile(filePath, JSON.stringify(welcomeFile, null, ' '), (err) => {
                        message.channel.send("The message has been added!")
                    });
                }
                else {
                    message.channel.send("Please put in a message")
                }
            }

            if (args[0] === 'messagelist' && isEditor(message.member, guildConfig)) {
                var list = 'List of messages:\n';
                welcomeFile.messages.forEach(function (message, i) {
                    list = list + i + ': ' + message.join(' ') + '\n';
                    if (list.length > 1400) {
                        message.author.send(list);
                        list = '';
                    }
                })
                message.author.send(list);
            }

            if (args[0] === 'delmessages' && isEditor(message.member, guildConfig)) {

                let IDs = args.slice(1, args.length);

                IDs.sort(function (a, b) { return b - a; })
                let countFails = 0;
                let lastID = -1;
                for (var i = 0; i < IDs.length; i++) {
                    if (!isNaN(IDs[i]) && IDs[i] >= 0 && IDs[i] < welcomeFile.messages.length && lastID !== IDs[i]) {
                        welcomeFile.messages.splice(IDs[i], 1);
                        lastID = IDs[i];
                    }
                    else {
                        countFails++;
                        lastID = IDs[i];
                    }
                }
                fs.writeFile(path.join(filePath), JSON.stringify(welcomeFile, null, ' '), (err) => {
                    message.channel.send((IDs.length - countFails) + "/" + IDs.length + "messages has been deleted");
                    delete require.cache[require.resolve(filePath)];
                });
            }

            if (args[0] === 'addlinks' && isEditor(message.member, guildConfig)) {
                var newLinks = args.splice(1, args.length);
                var fails = 0;
                if (newLinks.length != 0) {
                    newLinks.forEach(link => {
                        if (isUrl(link) && isFile(link)) {
                            welcomeFile.links.push(link);
                        }
                        else {
                            fails++;
                        }
                    })
                    fs.writeFile(filePath, JSON.stringify(welcomeFile, null, ' '), (err) => {
                        message.channel.send((newLinks.length - fails) + "/" + newLinks.length + " links added!")
                    });
                }
                else {
                    message.channel.send("Please put in a link")
                }
            }

            if (args[0] === 'linklist' && isEditor(message.member, guildConfig)) {
                var list = 'List of links:\n';
                welcomeFile.links.forEach(function (link, i) {
                    list = list + i + ': <' + link + '>\n';
                    if (list.length > 1400) {
                        message.author.send(list);
                        list = '';
                    }
                })
                message.author.send(list);
            }

            if (args[0] === 'dellinks' && isEditor(message.member, guildConfig)) {

                let IDs = args.slice(1, args.length);

                IDs.sort(function (a, b) { return b - a; })
                let countFails = 0;
                let lastID = -1;
                for (var i = 0; i < IDs.length; i++) {
                    if (!isNaN(IDs[i]) && IDs[i] >= 0 && IDs[i] < welcomeFile.links.length && lastID !== IDs[i]) {
                        welcomeFile.links.splice(IDs[i], 1);
                        lastID = IDs[i];
                    }
                    else {
                        countFails++;
                        lastID = IDs[i];
                    }
                }
                fs.writeFile(path.join(filePath), JSON.stringify(welcomeFile, null, ' '), (err) => {
                    message.channel.send((IDs.length - countFails) + "/" + IDs.length + "links has been deleted");
                    delete require.cache[require.resolve(filePath)];
                });
            }

            if (args[0] === 'addrole' && isEditor(message.member, guildConfig)) {
                var role = args.slice(1, args.length).join(' ');
                if (checkRoleExist(role, getRoleNames(message.guild.roles))) {
                    let roleId = getRoleId(getRoleNameIdList(message.guild.roles), role)
                    if (welcomeFile.roles.includes(roleId)) { return message.channel.send('Role is already added'); }
                    welcomeFile.roles.push(roleId);
                    fs.writeFile(filePath, JSON.stringify(welcomeFile, null, ' '), (err) => {

                        message.channel.send(role + ' role has been added').catch(console.error);

                    });
                }
                else { return message.channel.send('Role does not exist. Note that roles are capital sensitive.'); }
            }

            if (args[0] === 'delrole' && isEditor(message.member, guildConfig)) {
                var role = args[1];
                if (checkRoleExist(role, getRoleNames(message.guild.roles))) {
                    let roleId = getRoleId(getRoleNameIdList(message.guild.roles), role)
                    if (!welcomeFile.roles.includes(roleId)) { return message.channel.send('Role was not added'); }
                    delElement(welcomeFile.roles, roleId);
                    fs.writeFile(filePath, JSON.stringify(welcomeFile, null, ' '), (err) => {
                        message.channel.send(role + ' role has been deleted').catch(console.error);
                    });
                }
                else { return message.channel.send('Role does not exist. Note that roles are capital sensitive.'); }
            }

            if (args[0] === 'setannouncechannel' && isEditor(message.member, guildConfig)) {
                let channel = message.channel.id;
                welcomeFile.announceChannel = channel;
                fs.writeFile(filePath, JSON.stringify(welcomeFile, null, ' '), (err) => {
                    message.channel.send('The announce channel is set to ' + getChannel(channel, message.guild)).catch(console.error);
                });
            }

            if (args[0] === 'setmessageenabled') {
                let setting = args[1];
                if (setting === 'true') {
                    welcomeFile.messageEnabled = true;
                    fs.writeFile(filePath, JSON.stringify(welcomeFile, null, ' '), (err) => {
                        message.channel.send("Welcome messages are enabled").catch(console.error);
                    });
                }
                else if (setting === 'false') {
                    welcomeFile.messageEnabled = false;
                    fs.writeFile(filePath, JSON.stringify(welcomeFile, null, ' '), (err) => {
                        message.channel.send("Welcome messages are disabled").catch(console.error);
                    });
                }
                else { message.channel.send("Please give a valid input. Use either 'true' or 'false'") }
            }

            if (args[0] === 'setdelay' && isEditor(message.member, guildConfig)) {
                let delay = args[1];
                if (!isNaN(delay)) {
                    delay = parseInt(delay);
                    if (delay >= 0 && delay <= 10080) {
                        welcomeFile.delay = delay;
                        fs.writeFile(filePath, JSON.stringify(welcomeFile, null, ' '), (err) => {
                            message.channel.send('The delay is set to ' + delay + ' minutes').catch(console.error);
                        });
                    }
                    else (message.channel.send("Please but in a valid delay in min. The max is 10080 minutes (7 days)"))
                }
                else (message.channel.send("Please but in a valid delay in min. The max is 10080 minutes (7 days)"))
            }

            if (args[0] === 'setcolor' && isEditor(message.member, guildConfig)) {
                let newColor = args[1];
                if (!isNaN(newColor)) {
                    if (newColor > 0 && newColor <= 16777215) {
                        welcomeFile.color = parseInt(newColor);
                        fs.writeFile(filePath, JSON.stringify(welcomeFile, null, ' '), (err) => {
                            message.channel.send('The color is set to ' + newColor).catch(console.error);
                        });
                    }
                    else {
                        message.channel.send("Please fill in a valid color in decimals (0-16777215)");
                    }
                }
                else {
                    message.channel.send("Please fill in a valid color in decimals (0-16777215)");
                }
            }

            if (args[0] === 'settings' && isEditor(message.member, guildConfig)) {
                message.channel.send("messageenabled: " + welcomeFile.messageEnabled + "\nroles: " + getRoles(welcomeFile.roles, message.guild).join(', ') + "\ndelay: " + welcomeFile.delay +
                    "\nannouncechannel: " + getChannel(welcomeFile.announceChannel, message.guild) + "\ncolor: " + welcomeFile.color);
            }

            if (args[0] === 'announce' || toAnnounce) {
                if (welcomeFile.messageEnabled) {
                    const Discord = require("discord.js");
                    const embed = new Discord.RichEmbed;
                    let messageID = Math.floor(Math.random() * welcomeFile.messages.length);
                    let linkID = Math.floor(Math.random() * welcomeFile.links.length);
                    embed.setTitle("Welcome **" + message.member.displayName + "** to **" + message.guild.name + "**!");
                    embed.setColor(welcomeFile.color);
                    if (welcomeFile.messages.length != 0) {
                        let description = welcomeFile.messages[messageID];
                        embed.setDescription(lineGen(description, message));
                    }
                    if (welcomeFile.links.length != 0) {
                        let link = welcomeFile.links[linkID];
                        embed.setImage(link);
                    }
                    getChannel(welcomeFile.announceChannel, message.guild).send(embed);
                }
                message.member.setRoles(welcomeFile.roles)
                    .then()
                    .catch(console.error);

            }


            if (args[0] === 'disable' && isAdmin(message.member)) {
                welcomeFile.enabled = false;
                fs.writeFile(filePath, JSON.stringify(welcomeFile, null, ' '), (err) => {
                    message.channel.send("Welcome module is now disabled");
                });
            }
        }

    }
    catch (e) {
        if (e.code === 'MODULE_NOT_FOUND') {
            console.error;
        }
        console.log(e);
        console.error;
    }

    if (args[0] === 'enable' && isAdmin(message.member)) {
        function Welcome(announceChannel, delay = 0, enabled = false, color = 16737445, messageEnabled = true) {
            this.messages = [];
            this.links = [];
            this.roles = [];
            this.announceChannel = announceChannel;
            this.messageEnabled = messageEnabled;
            this.delay = delay
            this.enabled = enabled;
            this.color = color;
        }

        fs.open(filePath, 'wx', (err, fd) => {
            if (err) {
                if (err.code === 'EEXIST') {
                    const welcomeFile = require(filePath);
                    if (!welcomeFile.enabled) {
                        welcomeFile.enabled = true;
                        fs.writeFile(filePath, JSON.stringify(welcomeFile, null, ' '), (err) => {
                            message.channel.send("Welcome module is now enabled! Please make sure any message is added");
                        });
                    }
                    else {
                        message.channel.send("Welcome module is already enabled!")
                    }
                    return;
                }
                throw err;
            }
            var welcomeFile = new Welcome(message.channel.id);
            welcomeFile.enabled = true;
            fs.write(fd, JSON.stringify(welcomeFile, null, ' '), (err) => {
                if (err) { console.error('Write failed'); }
                message.channel.send("Welcome module is now enabled! Please make sure any message is added").catch(console.error);
                fs.close(fd, (err) => {
                    if (err) { console.error('Write failed'); throw err; }
                });
            });
        });
    }



}
