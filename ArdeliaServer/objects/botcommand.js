const path = require('path');
const BotFile = require(path.join(__dirname,'.','botfile.js'));
const Discord = require("discord.js");


function BotCommand(name, descriptions = [], botFiles = [] , permissionLevel = 0, info = 'No information given about command'){
  this.name = name;
  this.info = info;
  this.descriptions = descriptions;
  this.botFiles = botFiles;
  this.permissionLevel = permissionLevel;
  this.addBotFiles = addBotFiles;
  this.delBotFiles = delBotFiles;
  this.embedList = embedList;
  this.descriptionsList = descriptionsList;
  this.setDescriptions = setDescriptions;
  this.addDescriptions = addDescriptions;
  this.delDescriptions = delDescriptions;
  this.chooseDescription = chooseDescription;
  this.chooseLinkDescription = chooseLinkDescription;
  this.botFileDescriptionList = botFileDescriptionList;
  this.descriptionsList = descriptionsList;
  this.embedList = embedList;
  this.importBotFile = importBotFile;
}


function addBotFiles(links, descriptions){
  for (var i = 0; i < links.length; i++){
    var link = links[i];
    var description = descriptions[i];
    var newBotFile = new BotFile(link, description);
    this.botFiles.push(newBotFile);
  }
}

function delBotFiles(IDs){
  IDs.sort(function(a,b){ return b - a; })
  let countFails = 0;
  let lastID = -1;
  for (var i = 0; i < IDs.length; i++){
    if(!isNaN(IDs[i]) && IDs[i] >= 0 && IDs[i] < this.botFiles.length){
      this.botFiles.splice(IDs[i],1);
      lastID = IDs[i];
    }
    else{
      countFails++;
      lastID = IDs[i];
    }
  }
  return countFails;
}

function setDescriptions(newMessage, messageID, botFileID = -1){
  let check = false;
  if(botFileID === -1)
  {
    if(messageID >= 0 && !isNaN(messageID) && messageID < this.descriptions.length){
      this.descriptions[messageID] = newMessage;
      check = true;
      return check;
    }
  }
  else if (!isNaN(botFileID) && botFileID >= 0 && messageID >=0 && messageID < this.botFiles.length ){
    if(botFileID < this.botFiles[messageID].descriptions.length){
      this.botFiles[messageID].setDescription(botFileID,newMessage);
      check = true;
      return check;
    }
  }
  else{
    return check;
  }
}

function addDescriptions(descriptions){
  for (var i = 0; i < descriptions.length; i++){
    this.descriptions.push(descriptions[i]);
  }
}

function delDescriptions(IDs){
  IDs.sort(function(a,b){ return b - a; })
  let countFails = 0;
  let lastID = -1;
  for (var i = 0; i < IDs.length; i++){
    if(!isNaN(IDs[i]) && IDs[i] >= 0 && IDs[i] < this.descriptions.length && lastID !== IDs[i]){
      this.descriptions.splice(IDs[i],1);
      lastID = IDs[i];
    }
    else{
      countFails++;
      lastID = IDs[i];
    }
  }
  return countFails;
}

function chooseDescription(id = -1){
  if(id >= -1 && id < this.descriptions.length && !isNaN(id)){
    if(id === -1){
      let randId = Math.floor(Math.random() * this.descriptions.length);
      let description = this.descriptions[randId];
      return description;
    }
    else {
      let description = this.descriptions[id];
      return description
    }
  }
  else {
    let output = -1;
    return output;
  }

}

function chooseLinkDescription(id = -1, fileDescrId = -1, descrId = -1){
  if(id >= -1 && id < this.botFiles.length && !isNaN(id)){
    if(id === -1){
      let randId = Math.floor(Math.random() * this.botFiles.length);
      let link = this.botFiles[randId].link;
      let description = this.botFiles[randId].chooseDescription();
      if(description === -2){
        let output = -1;
        return output;
      }
      if(description === -1){
        description = this.chooseDescription();
        let output = [link, description];
        return output;
      }
      let output = [link, description];
      return output;
    }
    else if (fileDescrId == -2) {
      let link = this.botFiles[id].link;
      description = this.chooseDescription(descrId);
      if(description === -1){
        let output = -1;
        return output;
      }
      let output = [link, description];
      return output;
    }
    else{
      let description = this.botFiles[id].chooseDescription(fileDescrId);
      if(description === -2){
        let output = -1;
        return output;
      }
      if (description === -1){
        let link = this.botFiles[id].link;
        description = this.chooseDescription(fileDescrId);
        if(description === -1){
          description = this.chooseDescription();
          let output = [link, description];
          return output;
        }
        let output = [link, description];
        return output;
      }
      let link = this.botFiles[id].link;
      let output = [link,description];
      return output;
    }
  }
  else {
    let output = -1;
    return output;
  }
}

function botFileDescriptionList(messageObj,client){
  var list = "";
  this.botFiles.forEach(function(botFile,i) {
    if (list.length > 800){
      messageObj.author.send(list);
      list = '';
    }
    list = list + 'Message list of link (ID: '+ i+'): <' + botFile.link +'>\n';
    botFile.descriptions.forEach(function(description,j) {
      list = list +'- '+ j + ': '+ description.join(' ') + '\n';
    })
  })
    messageObj.author.send(list);
}

function descriptionsList(){
  let listArray = [];
  let list = '';
  this.descriptions.forEach(function(message,i) {
    list =  list + i + ': ' + message.join(' ') + '\n';
    if (list.length > 1400){
      listArray.push(list);
      list = '';
    }
  })
  listArray.push(list);
  return listArray;
}

function embedList(messageObj){
  let customIndex = 0;
  const embed = new Discord.RichEmbed()
  const embedArray = [embed];
  let page = 0;
  let list = this.descriptionsList();
  let maxIter = 24 - list.length;
  embedArray[0].setTitle("List of links with IDs and command messages, page " + (page+1) +". For linkmessages see linkmessagelist");
  embedArray[0].setColor(0x00AE86);
  list.forEach(function(descriptions,i){
    embedArray[0].addField('Command Messages:', descriptions);
  })
  this.botFiles.forEach(function(BotFile,i){
    embedArray[page].addField(i +' ', BotFile.link)
    customIndex++;
    if (customIndex === maxIter){
      messageObj.author.send(embedArray[page]).catch(console.error);
      customIndex = 0;
      page++;
      maxIter = 24;
      embedArray.push(new Discord.RichEmbed())
      embedArray[page].setTitle("List of links with IDs and messages, page " + (page+1))
      embedArray[page].setColor(0x00AE86)
    }
  })
  messageObj.author.send(embedArray[page]).catch(console.error);
}

function importBotFile(botFilesObj){
  botFilesObj.forEach(botFileFile =>{
    let botFile = new BotFile(botFileFile.link, botFileFile.descriptions );
    this.botFiles.push(botFile);
  })
}



module.exports = BotCommand;
