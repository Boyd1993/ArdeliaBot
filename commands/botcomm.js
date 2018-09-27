exports.run = (client, message, args, guildConfig) => {
  const Discord = require("discord.js");
  const fs = require("fs");
  const path = require('path');
  var file = require(path.join(__dirname,'..','savefiles',message.guild.id,'botcommands.json'));
  var BotCommandFile = require(path.join(__dirname,'..','objects','botcommandfile.js'));
  var botCommands = new BotCommandFile();
  botCommands.importFile(file);
  require(path.join(__dirname,'.','methods.js'))();
  let wantedCommand = args[0];
  if(botCommands.has(wantedCommand)){

    if(args[1] === 'add' && isEditor(message.member,guildConfig)){
      let input = args.slice(2,args.length);
      let linkDescr = linkSplitter(input);
      botCommands.botCommands[wantedCommand].addBotFiles(linkDescr[0],linkDescr[1]);
      fs.writeFile(path.join(__dirname,'..','savefiles',message.guild.id,'botcommands.json'), botCommands.toSaveFile(), (err) => {
        message.channel.send(linkDescr[0].length+ " new link(s) has been added to " + wantedCommand).catch(console.error);
        const reloadjson = client.commands.get('reloadjson');
        reloadjson.run(client, message,args , guildConfig, true);
      });
    }

    else if(args[1] === 'del' && isEditor(message.member,guildConfig)){
      let delids = args.slice(2,args.length);
      let numberOfDelGifs = delids.length;
      let fails = botCommands.botCommands[wantedCommand].delBotFiles(delids)
      if (numberOfDelGifs - fails > 0){
        fs.writeFile(path.join(__dirname,'..','savefiles',message.guild.id,'botcommands.json'), botCommands.toSaveFile(), (err) => {
          message.channel.send("Link(s) has been deleted. " + fails +"/"+ numberOfDelGifs+" unvalid IDs were given" ).catch(console.error);
          const reloadjson = client.commands.get('reloadjson');
          reloadjson.run(client, message,args , guildConfig, true);
        });
      }
      else{
        message.channel.send('Something went wrong with deleting the link. Please eneter a valid ID to delete')
      }
    }

    else if(args[1] === 'edit' && isEditor(message.member,guildConfig)){
      let toEdit = args[2];
      let newSetting = args.slice(3, args.length);
      if(toEdit != 'linkfile' && gifs[wantedCommand].hasOwnProperty(toEdit)){
        gifs[wantedCommand][toEdit] = newSetting;
        fs.writeFile(path.join(__dirname,'..','savefiles',message.guild.id,'botcommands.json'), JSON.stringify(gifs, null, ' '), (err) => {
          message.channel.send(toEdit + ' is set to ' + newSetting).catch(console.error);
        });
      }
      else {
        message.channel.send('This setting cannot by edited or does not exist.');
      }
    }

    else if(args[1] === 'editinfo' && isEditor(message.member,guildConfig)){
      let newInfo = args.slice(2, args.length);
      if(newInfo.length > 0){
        botCommands.botCommands[wantedCommand].info = newInfo.join(' ');
        fs.writeFile(path.join(__dirname,'..','savefiles',message.guild.id,'botcommands.json'), botCommands.toSaveFile(), (err) => {
          message.channel.send('Info is edited').catch(console.error);
          const reloadjson = client.commands.get('reloadjson');
          reloadjson.run(client, message,args , guildConfig, true);
        });
      }
      else {
        message.channel.send('Please add an description');
      }
    }

    else if(args[1] === 'addcommandmessages' && isEditor(message.member,guildConfig)){
      let newMessages = splitDescriptions(args.slice(2, args.length));
      botCommands.botCommands[wantedCommand].addDescriptions(newMessages)
      fs.writeFile(path.join(__dirname,'..','savefiles',message.guild.id,'botcommands.json'), botCommands.toSaveFile(), (err) => {
        message.channel.send(newMessages.length + ' command message(s) has been added').catch(console.error);
      });
    }

    else if(args[1] === 'delcommandmessages' && isEditor(message.member,guildConfig)){
      let delIDs = args.slice(2, args.length);
      let countFails = botCommands.botCommands[wantedCommand].delDescriptions(delIDs);
      if(delIDs.length - countFails > 0){
        fs.writeFile(path.join(__dirname,'..','savefiles',message.guild.id,'botcommands.json'), botCommands.toSaveFile(), (err) => {
          message.channel.send('The command message(s) has been deleted. ' + countFails + '/'+ delIDs.length +' invalid IDs were given').catch(console.error);
        });
      }
      else{
        message.channel.send('Something went wrong with deleting the message(s). Make sure you picked a valid ID');
      }
    }
    else if(args[1] === 'addlinkmessages' && isEditor(message.member,guildConfig)){
      let linkID = args[2];
      let newMessages = splitDescriptions(args.slice(3, args.length));
      let check = botCommands.botCommands[wantedCommand].botFiles[linkID].addDescriptions(newMessages);
      fs.writeFile(path.join(__dirname,'..','savefiles',message.guild.id,'botcommands.json'), botCommands.toSaveFile(), (err) => {
        message.channel.send(newMessages.length + ' command(s) message has been added').catch(console.error);
      });
    }

    else if(args[1] === 'dellinkmessages' && isEditor(message.member,guildConfig)){
      let linkID = args[2];
      let delIDs = args.slice(3, args.length);
      let countFails = botCommands.botCommands[wantedCommand].botFiles[linkID].delDescriptions(delIDs);
      if(delIDs.length - countFails > 0){
        fs.writeFile(path.join(__dirname,'..','savefiles',message.guild.id,'botcommands.json'), botCommands.toSaveFile(), (err) => {
          message.channel.send('The command message(s) has been deleted. ' + countFails + '/'+ delIDs.length +' invalid IDs were given').catch(console.error);
        });
      }

      else{
        message.channel.send('Something went wrong with deleting the message(s). Make sure you picked a valid ID');
      }
    }

    else if(args[1] === 'editcommandmessage' && isEditor(message.member,guildConfig)){
      let toEdit = args[2];
      let newMessage = (args.slice(3, args.length));
      let check = botCommands.botCommands[wantedCommand].setDescriptions(newMessage, toEdit);
      if(check){
        fs.writeFile(path.join(__dirname,'..','savefiles',message.guild.id,'botcommands.json'), botCommands.toSaveFile(), (err) => {
          message.channel.send('The command message has been edited').catch(console.error);
        });
      }
      else{
        messageObj.channel.send('Something went wrong by editing the description. Make sure you picked a valid ID');
      }
    }


    else if(args[1] === 'editlinkmessage' && isEditor(message.member,guildConfig)){
      let linkID = args[2];
      let messageID = args[3];
      let newMessage = args.slice(4, args.length);
      let check = botCommands.botCommands[wantedCommand].setDescriptions(newMessage, linkID, messageID);
      if(check){
        fs.writeFile(path.join(__dirname,'..','savefiles',message.guild.id,'botcommands.json'), botCommands.toSaveFile(), (err) => {
          message.channel.send('The Link message has been edited').catch(console.error);
        });
      }
      else{
        message.channel.send('Something went wrong with editing the description. Make sure you picked a valid ID');
      }
    }

    else if(args[1] === 'linkmessagelist'){
      botCommands.botCommands[wantedCommand].botFileDescriptionList(message);
    }

    else if(args[1] === 'list'){
      botCommands.botCommands[wantedCommand].embedList(message);
    }

    else {
      const commandToMember = message.mentions.members.first();
      if(message.mentions.members.size !== 0 ){
        var wantedLinkId = args[2];
        var wantedFileDescrId = args[3];
        var wantedDescrId = args[4];
      }
      else{
        var wantedLinkId = args[1];
        var wantedFileDescrId = args[2];
        var wantedDescrId = args[3];
      }
      let wantedLink = botCommands.botCommands[wantedCommand].chooseLinkDescription(wantedLinkId, wantedFileDescrId,wantedDescrId);
      if(wantedLink === -1)
      {
        console.log('unvalid');
        return;
      }
      let link = wantedLink[0];
      let messageToUser = lineGen(wantedLink[1],message);
      message.channel.send({embed: {
        color: guildConfig.embedcolor,
        description: messageToUser,
        "image": {
          "url": link
        }
      }}).catch(console.error);

    }


  }
  else{message.channel.send('Botcommand does not exist')}

}
