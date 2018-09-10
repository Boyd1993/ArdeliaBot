exports.run = (client, message, args, guildConfig) => {
  require('./methods.js')();

  if(isModerator(message.member,guildConfig)){
    const fs = require("fs");
    require('./methods.js')();
    let roleToChange = args[1];

    if (args[0] === 'addModerator'){
      if(checkRoleExist(roleToChange,getRoleNames(message.guild.roles))){
        let addedRoleId = getRoleId(getRoleNameIdList(message.guild.roles), roleToChange);
        if (listModeratorRoles(guildConfig).includes(addedRoleId)){return message.channel.send('Role already has moderator permissions.');}
        guildConfig.moderatorRoles.push(addedRoleId);
        fs.writeFile("../ArdeliaBot/savefiles/"+message.guild.id+"/config.json", JSON.stringify(guildConfig, null, ' '), (err) =>{

          message.channel.send('The '+ roleToChange +' role has been added to the moderator list').catch(console.error);

        });
      }
      else{return message.channel.send('Role does not exist. Note that roles are capital sensitive.');}
    }
    if (args[0] === 'addEditor'){
      if(checkRoleExist(roleToChange,getRoleNames(message.guild.roles))){
        let addedRoleId = getRoleId(getRoleNameIdList(message.guild.roles), roleToChange)
        if (listEditorRoles(guildConfig).includes(addedRoleId)){return message.channel.send('Role already has editor permissions.');}
        guildConfig.editorRoles.push(addedRoleId);
        fs.writeFile("../ArdeliaBot/savefiles/"+message.guild.id+"/config.json", JSON.stringify(guildConfig, null, ' '), (err) =>{

          message.channel.send('The '+ roleToChange +' role has been added to the editor list').catch(console.error);

        });
      }
      else{return message.channel.send('Role does not exist. Note that roles are capital sensitive.');}
    }
    if (args[0] === 'delModerator'){
      if(checkRoleExist(roleToChange,getRoleNames(message.guild.roles))){
        let delRoleId = getRoleId(getRoleNameIdList(message.guild.roles), roleToChange);
        if (!listModeratorRoles(guildConfig).includes(delRoleId)){return message.channel.send('Role did not have moderator permissions.');}
        delElement(guildConfig.moderatorRoles , delRoleId);
        fs.writeFile("../ArdeliaBot/savefiles/"+message.guild.id+"/config.json", JSON.stringify(guildConfig, null, ' '), (err) =>{

          message.channel.send('The '+ roleToChange +' role has been deleted from the moderator list').catch(console.error);

        });
      }
      else{return message.channel.send('Role does not exist. Note that roles are capital sensitive.');}
    }
    if (args[0] === 'delEditor'){
      if(checkRoleExist(roleToChange,getRoleNames(message.guild.roles))){
        let delRoleId = getRoleId(getRoleNameIdList(message.guild.roles), roleToChange)
        if (!listModeratorRoles(guildConfig).includes(delRoleId)){return message.channel.send('Role did not have editor permissions.');}
        delElement(guildConfig.editatorRoles , delRoleId);
        fs.writeFile("../ArdeliaBot/savefiles/"+message.guild.id+"/config.json", JSON.stringify(guildConfig, null, ' '), (err) =>{
          message.channel.send('The '+ roleToChange +' role has been deleted from the editor list').catch(console.error);

        });
      }
      else{return message.channel.send('Role does not exist. Note that roles are capital sensitive.');}
    }
  }

}
