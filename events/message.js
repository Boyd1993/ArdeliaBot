module.exports = (client, message) => {
    const path = require('path');
    if (message.author.bot) return;

    try {
        const guildConfig = require("../savefiles/" + message.guild.id + "/config.json");
        // Ignore messages not starting with the prefix (in config.json)
        if (message.content.indexOf(guildConfig.prefix) !== 0) return;
        const Enmap = require("enmap");
        const fs = require("fs");
        const guildComm = new Enmap();

        // Our standard argument/command name definition.
        const args = message.content.slice(guildConfig.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        // Grab the command data from the client.commands Enmap
        const cmd = client.commands.get(command);
        // If that command doesn't exist, silently exit and do nothing
        if (cmd) {
            cmd.run(client, message, args, guildConfig);
        }
        else {
            fs.readdir("./savefiles/" + message.guild.id + "/commands/", (err, files) => {
                if (err) return console.error(err);
                files.forEach(file => {
                    if (!file.endsWith(".js")) return;
                    if (command + '.js' === file) {
                        const botComm = require("../savefiles/" + message.guild.id + "/commands/" + file);
                        console.log(`Attempting to load command ${command}`);
                        botComm.run(client, message, [command].concat(args), guildConfig);
                    }
                    else { return; }
                });
            });
        }
    }
    catch (e) {
        console.log(e);
        if (e.code === 'MODULE_NOT_FOUND') {
            const fs = require("fs");
            require('../commands/methods.js')();
            const guildConfig = writeNewSaveFile(message.guild.id, fs);
            message.channel.send('For some reason I could not find a save file. I have created one for you! Please try to add commands again');
        }
        else {
            console.error(e);
        }
    }

};
