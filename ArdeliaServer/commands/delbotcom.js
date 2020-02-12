exports.run = (client, message, args, guildConfig) => {
  const path = require('path');
  require(path.join(__dirname,'.','methods.js'))();
  var file = require(path.join(__dirname,'..','savefiles',message.guild.id,'botcommands.json'));
  var BotCommandFile = require(path.join(__dirname,'..','objects','botcommandfile.js'));
  var botCommands = new BotCommandFile();
  botCommands.importFile(file);


  if(isEditor(message.member,guildConfig)){
    var file = require(path.join(__dirname,'..','savefiles',message.guild.id,'botcommands.json'));
    var BotCommandFile = require(path.join(__dirname,'..','objects','botcommandfile.js'));
    var botCommands = new BotCommandFile();
    botCommands.importFile(file);
    const botCommName = args[0].toLowerCase();
    const fs = require("fs");
    let filePath = path.join(__dirname,'..','savefiles', message.guild.id, 'commands');

    fs.unlink(path.join(filePath, botCommName +'.js'),  (err) =>{
      if (err){
        return message.channel.send('Command does not exist').catch(console.error);
      }
      console.log(botCommands);
      let check = botCommands.del(botCommName,message,guildConfig);
      if (check){
        fs.writeFile(path.join(__dirname,'..','savefiles', message.guild.id , 'botcommands.json'), botCommands.toSaveFile(), (err) =>{
          const reloadjson = client.commands.get('reloadjson');
          reloadjson.run(client, message,args , guildConfig, true);
        });
      }
    });

  }
}
