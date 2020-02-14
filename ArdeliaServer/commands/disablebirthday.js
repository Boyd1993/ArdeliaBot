exports.run = (client, message, args, guildConfig) => {
    const path = require('path');
    const fs = require('fs');
    const commonpaths = require(path.join(__dirname, "..", "common", "commonpaths"));
    require(commonpaths.commonMethods)();

    if (isAdmin(message.member, guildConfig)) {
        let filePath = path.join(__dirname, '..', 'savefiles', message.guild.id, 'commands');

        fs.unlink(path.join(filePath, 'birthday.js'), (err) => {
            if (err) {
                return message.channel.send('Birthday is already disabled').catch(console.error);
            }
            message.channel.send('The birthday module is now disabled!');
        });

    }
}
