const fs = require("fs");
const path = require('path');
var file = require(path.join(__dirname,'..','savefiles','487253159954219009','botcommands.json'));
var BotCommandFile = require(path.join(__dirname,'..','objects','botcommandfile.js'));
var botCommands = new BotCommandFile();
botCommands.importFile(file);

console.log(botCommands.botCommands.hug.chooseLinkDescription(0, -2,6));
