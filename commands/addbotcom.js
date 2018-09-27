exports.run = (client, message, args, guildConfig) => {
  const path = require('path');
  require(path.join(__dirname,'.','methods.js'))();
  var BotCommandFile = require(path.join(__dirname,'..','objects', 'botcommandfile.js'));
  var botCommandsFile = require(path.join(__dirname,'..','savefiles', message.guild.id, 'botcommands.json'));
  var botCommands = new BotCommandFile();
  botCommands.importFile(botCommandsFile);

  if(isEditor(message.member,guildConfig)){

    const botCommName = args[0].toLowerCase();
    const fs = require('fs');
    let toSave = "exports.run = (client, message, args, guildConfig) => {  client.commands.get('botcomm').run(client, message, args , guildConfig);}";
    let filePath = path.join(__dirname,'..', 'savefiles', message.guild.id,'commands')  ;

    let descrInfo = splitInfoDescription(args.slice(1,args.length));
    let info = descrInfo[1];
    let descr = descrInfo[0];
    if(typeof descr != "undefined" && descr != null && descr.length != null && descr.length > 0){
      fs.writeFile(path.join(filePath, botCommName +'.js'), toSave, (err) =>{
        botCommands.add(botCommName, descr, message, guildConfig, info);
        fs.writeFile(path.join(__dirname, '..', 'savefiles', message.guild.id,'botcommands.json'), botCommands.toSaveFile() , (err) =>{
          const reloadjson = client.commands.get('reloadjson');
          reloadjson.run(client, message,args , guildConfig, true);
          console.error;
        });
      });
    }
    else {message.channel.send('Please add an description.')}
  }
}
