exports.run = (client, message, args, guildConfig) => {
    const path = require("path");
    const commonpaths = require(path.join(__dirname, "..", "common", "commonpaths"));
    require(commonpaths.commonMethods)();
    if (isModerator(message.member, guildConfig)) {
        const fs = require("fs");
        let toedit = args[0];
        let value = args[1];

        // Now we have to save the file.
        if (CheckSettingExist(guil, toedit)) {
            fs.writeFile("../ArdeliaBot/savefiles/" + message.guild.id + "/config.json", JSON.stringify(getNewConfigFile(guildConfig, toedit, value), null, ' '), (err) => {

                message.channel.send(toedit + ' has been updated to ' + value).catch(console.error);

            });
        }
        else { message.channel.send(toedit + ' is not a configurable setting') }
    }
}
