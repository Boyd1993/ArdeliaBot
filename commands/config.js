exports.run = (client, message, args) => {
  // Gets the prefix from the command (eg. "!prefix +" it will take the "+" from it)
  const fs = require("fs");
  const guildConfig = require("../savefiles/"+message.guild.id+"/config.json");
  require('./methods')();
  let wantedSetting = args[0];

  if(wantedSetting === undefined){

    message.channel.send('Give a setting to show');
  }
  // Now we have to save the file.
  else if(CheckSettingExist(guildConfig,wantedSetting)){
    message.channel.send(wantedSetting +' : '+ guildConfig[wantedSetting]);
  }
  else{message.channel.send(wantedSetting+ ' is not a configurable setting')}
}
