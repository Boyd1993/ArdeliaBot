exports.run = (client, message, args, guildConfig) => {
    const path = require('path');
    const commonpaths = require(path.join(__dirname, "..", "common", "commonpaths"));
    require(commonpaths.commonMethods)();
    const logger = require(path.join(__dirname, '..', 'util', 'logger.js'));

    if (isAdmin(message.member, guildConfig)) {
        if (args.length != 0) {
            const fs = require('fs');
            let filename = 'birthday.js';
            let dest = path.join(__dirname, '..', 'savefiles', message.guild.id, 'commands', filename);
            let saveFile = path.join(__dirname, '..', 'savefiles', message.guild.id, 'birthdays.json');
            let birthdayCommand = `exports.run = (client, message, args, guildConfig) => {const path = require('path'); const birthday = require(path.join(__dirname, '..' ,'..', '..', 'objects', 'birthday.js')); birthday.run(client, message, args , guildConfig);}`;

            fs.open(dest, 'wx', (err, fd) => {
                if (err) {
                    if (err.code === 'EEXIST') {
                        message.channel.send('Birthday module is already enabled!');
                        return;
                    }
                    logger.error(err.toString(), message.guild);
                    console.error(err);
                    message.channel.send('Something unexpected went wrong. Please call bcv');
                    return;
                }
                fs.write(fd, birthdayCommand, err => {
                    if (err) {
                        logger.error(err.toString(), message.guild);
                        console.error(err);
                        message.channel.send('Something unexpected went wrong. Please call bcv');
                        return;
                    }
                    fs.close(fd, err => {
                        if (err) {
                            logger.error(err.toString(), message.guild);
                            console.error(err);
                            message.channel.send('Something unexpected went wrong. Please call bcv');
                            return;
                        }
                        let birthdayMessage = args.join(' ');
                        var BirthdayList = require(path.join(__dirname, '..', 'objects', 'birthdaylist.js'));
                        var birthdayList = new BirthdayList(birthdayMessage, message.channel.id);
                        fs.open(saveFile, 'wx', (err, fd) => {
                            if (err) {
                                if (err.code === 'EEXIST') {
                                    message.channel.send('Birthday module is enabled! Your old savefiles are retrieved! Your old birthday message is NOT overwritten. See !help birthday');
                                    console.error('myfile already exists');
                                    return;
                                }
                                logger.error(err.toString(), message.guild); console.error('opening file failed');
                            }
                            fs.write(fd, JSON.stringify(birthdayList, null, ' '), (err) => {
                                if (err) { logger.error(err.toString(), message.guild); console.error('Write failed'); }
                                fs.close(fd, (err) => {
                                    message.channel.send('Birthday module is enabled! As default I will announce the birthdays at 12.00 UTC.' +
                                        'If you want another time please use !birthday sethour <hour in 0-23> and !birthday setmin <min in 0-59> with time in UTC. You can also add some fancy images with !birthday addimg <links>.' +
                                        ' For all settings see !birthday settings. You can edit all settings with !birthday set<setting> <new value>. For more help use !help birthday');
                                    if (err) { logger.error(err.toString(), message.guild); console.error('Write failed'); }
                                });
                            });
                        });
                    })
                });
            });
        }
        else {
            message.channel.send('Please add an birthday message.')
        }
    }
}


