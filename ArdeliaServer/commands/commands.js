exports.run = (client, message, args, guildConfig) => {
    const commonpaths = require(path.join(__dirname, "..", "common", "commonpaths.js"));
    require(commonpaths.commonMethods)();
    const path = require('path');
    var file = require(path.join(__dirname, '..', 'savefiles', message.guild.id, 'botcommands.json'));
    var BotCommandFile = require(path.join(__dirname, '..', 'objects', 'botcommandfile.js'));
    var botCommands = new BotCommandFile();
    botCommands.importFile(file);

    botCommands.list(message, guildConfig);
}
