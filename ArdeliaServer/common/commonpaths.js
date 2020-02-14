const path = require("path");

module.exports.commands = path.join(__dirname, "..", "commands");
module.exports.events = path.join(__dirname, "..", "events");
module.exports.models = path.join(__dirname, "..", "objects");
module.exports.util = path.join(__dirname, "..util");
module.exports.savefiles = path.join(__dirname, "..", "savefiles");
module.exports.commonMethods = path.join(__dirname, "..", "common", "methods.js");
module.exports.savefilesOfGuild = function (guildId) { return path.join(module.exports.savefiles, guildId); };
module.exports.commandsOfGuild = function (guildId) { return path.join(module.exports.savefilesOfGuild(guildId), "commands"); };
module.exports.configOfGuild = function (guildId) { return path.join(module.exports.savefilesOfGuild(guildId), "config.json"); };
module.exports.birthdaysOfGuild = function (guildId) { return path.join(module.exports.savefilesOfGuild(guildId), "birthdays.json"); };
module.exports.welcomeOfGuild = function (guildId) { return path.join(module.exports.savefilesOfGuild(guildId), "welcome.json"); };
