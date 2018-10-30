const path = require('path');
const BotCommand = require(path.join(__dirname,'.','botcommand.js'));
const Discord = require("discord.js");

function BotCommandFile(){
  this.botCommands = {};
  this.add = add;
  this.addWithoutMessage = addWithoutMessage;
  this.del = del;
  this.has = has;
  this.list = list;
  this.toSaveFile = toSaveFile;
  this.importFile = importFile;
}

function add(name, descriptions, messageObj, guildConfig, info){
  if (!this.has(name) && name !== 'birthday'){
    let botCommand = new BotCommand(name, descriptions, undefined , undefined, info);
    this.botCommands[name] = botCommand;
    messageObj.channel.send('The command ' + guildConfig.prefix + name +' has been added!');
  }
  else if (this.has(name)){messageObj.channel.send('This command already exist!');}
  else {messageObj.channel.send('Something unknown went wrong. Please try again or contact support.');}

}

function addWithoutMessage(name, descriptions, botFiles){
  if (!this.has(name)){
    let botCommand = new BotCommand(name, descriptions, botFiles);
    this.botCommands[name] = botCommand;
  }
}

function del(name,messageObj, guildConfig){
  check = false;
  if (this.has(name)){
    delete this.botCommands[name];
    messageObj.channel.send('The command ' + guildConfig.prefix + name +' has been deleted!');
    check = true;
    return check;
  }
  else if (!this.has(name)){
    messageObj.channel.send('This command does not exist!');
    return check;
  }
  else {
    messageObj.channel.send('Something unknown went wrong. Please try again or contact support.');
    return check;
  }
}


function has(botCommandName){
  var isTrue = false;
  Object.keys(this.botCommands).forEach(name => {
    if (name === botCommandName) {
      isTrue = true;
      return isTrue;
    }})

    return isTrue;
  }

function list(messageObj,configFile){
  const embed = new Discord.RichEmbed();
  let embedArray = [embed];
  let prefix = configFile.prefix;
  let botComms = Object.keys(this.botCommands);
  let j = 0;
  let k = 0;
  embedArray[0].setTitle('List with Commands and info')
  for(var i = 0; i < botComms.length; i++){
    if (j === 24){
      j=0;
      embedArray[k].addField(prefix + botComms[i], this.botCommands[botComms[i]].info);
      embedArray.push(new Discord.RichEmbed());
      k++;
      return;
    }
    embedArray[k].addField(prefix + botComms[i], this.botCommands[botComms[i]].info);
    j++
  }
  embedArray.forEach(function(embed,i) {
    embed.setFooter('page ' + (i+1) + '/' + embedArray.length);
    messageObj.author.send(embed);
  })
}

function toSaveFile(){
  let file = JSON.stringify(this.botCommands, null , ' ');
  return file;
}

function importFile(file){
  let botCommands = file;
  Object.keys(botCommands).forEach(key =>{
    let botCommand = new BotCommand(botCommands[key].name, botCommands[key].descriptions, undefined , botCommands[key].permissionLevel, botCommands[key].info );
    botCommand.importBotFile(botCommands[key].botFiles);
    this.botCommands[key] = botCommand;
  })

}

module.exports = BotCommandFile;
