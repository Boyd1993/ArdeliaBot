exports.run = (client, message, args, guildConfig) => {
  require('./methods.js')();
  // Gets the prefix from the command (eg. "!prefix +" it will take the "+" from it)

  if(isModerator(message.member,guildConfig)){
    const fs = require("fs");
    const guildConfig = require("../savefiles/"+message.guild.id+"/config.json");
    let toedit = args[0];
    let value = args[1];

    function CheckSettingExist(configFile,setting){
      let check = false;
      Object.keys(configFile).forEach(function(settings, i){

        if(settings === setting){
          check = true;
          return check;}

        })
        return check;
      }


      function getNewConfigFile(configFile,setting,newValue){
        // change the configuration in memory

        configFile[setting] = newValue;

        return configFile;
      }
      // Now we have to save the file.
      if(CheckSettingExist(guildConfig,toedit)){
        fs.writeFile("../ArdeliaBot/savefiles/"+message.guild.id+"/config.json", JSON.stringify(getNewConfigFile(guildConfig,toedit,value), null, ' '), (err) =>{

          message.channel.send(toedit+' has been updated to '+ value).catch(console.error);

        });
      }
      else{message.channel.send(toedit+ ' is not a configurable setting')}
    }
  }
