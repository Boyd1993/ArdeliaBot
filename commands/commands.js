exports.run = (client, message, args, guildConfig) => {
  require('./methods.js')();
  const fs = require("fs");
  fs.readdir("./savefiles/"+ message.guild.id+"/commands/", (err, files) => {
    if (err) return console.error(err);
    let commandList = [];
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let commandName = file.slice(0,file.length-3);
      commandList.push(commandName);


    });
    let commandListString = '';
    commandList.forEach(nameOfCommand => {
      commandListString =  commandListString + guildConfig.prefix  +nameOfCommand + '\n';
    })
    message.channel.send(commandListString);
  });
}
