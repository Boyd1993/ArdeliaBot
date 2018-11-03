const path = require('path');
const Birthday = require(path.join(__dirname,'.','birthdayobj.js'));
const Discord = require("discord.js");


function BirthdayList(birthdayMessage, announceChannel, hour = 12, min = 0, color = '16737445'){
  this.birthdays = [];
  this.images = [];
  this.birthdayMessage = birthdayMessage;
  this.announceChannel = announceChannel;
  this.announceTimeHour = hour;
  this.announceTimeMin = min;
  this.color = color;
  this.announcedToday = false;
  this.tagEveryone = false;
  this.add = add;
  this.set = set;
  this.del = del;
  this.addImages = addImages;
  this.delImages = delImages;
  this.checkMemberList = checkMemberList;
  this.imgList = imgList;
  this.list = list;
  this.settingsList = settingsList;
  this.getBirthdays = getBirthdays;
  this.announceBirthdays = announceBirthdays;
  this.importFile = importFile;
}

function add(member, day, month, year){
  let newBirthday = new Birthday(member, parseInt(day,10), parseInt(month,10), parseInt(year,10));
  this.birthdays.push(newBirthday);
  this.birthdays.sort(function(a,b){
    if (a.month < b.month){
      return -1;
    }
    else if(a.month == b.month && a.day < b.day){
      return -1;
    }
    else {return 1;}
  });
}

function set(setting, newSetting, messageObj, client, args, guildConfig){
  const fs = require('fs');
  this[setting] = newSetting;
  fs.writeFile(path.join(__dirname,'..', 'savefiles', messageObj.guild.id ,'birthdays.json'), JSON.stringify(this, null , ' '), (err) =>{
    messageObj.channel.send(messageObj.member.displayName + "--> " + setting +" has been updated to: " + newSetting);
    const reloadjson = client.commands.get('reloadjsonbirthdays');
    reloadjson.run(client, messageObj, args , guildConfig, true);
  });
}

function del(member){
  let toDel = this.checkMemberList(member)[1];
  this.birthdays.splice(toDel,1);
}

function addImages(links){
  for (var i = 0; i < links.length; i++){
    this.images.push(links[i]);
  }
}

function delImages(IDs){
  IDs.sort(function(a,b){ return b - a; })
  let countFails = 0;
  let lastID = -1;
  for (var i = 0; i < IDs.length; i++){
    if(!isNaN(IDs[i]) && IDs[i] >= 0 && IDs[i] < this.images.length && lastID !== IDs[i]){
      this.images.splice(IDs[i],1);
      lastID = IDs[i];
    }
    else{
      countFails++;
      lastID = IDs[i];
    }
  }
  return countFails;
}

function checkMemberList(member){
  let list = this.birthdays;
  var IdList = [];
  list.forEach(birthday =>{
    IdList.push(birthday.member);
  })
  let check = IdList.includes(member);
  let Id = IdList.indexOf(member);
  return [check,Id];
}

function getName(memberId, guild){
  let memberArray = guild.members;
  let wantedMember = memberArray.get(memberId).displayName;
  return wantedMember;
}

function imgList(messageObj){
  const embed = new Discord.RichEmbed;
  let embedArray = [embed];
  let j = 0;
  let k = 0;
  embedArray[0].setTitle('URL of images and IDs')
  for(var i = 0; i < this.images.length; i++){
    if (j === 24){
      j=0;
      embedArray[k].addField(i, this.images[i]);
      embedArray.push(new Discord.RichEmbed());
      k++;
      return;
    }
    embedArray[k].addField(i, this.images[i]);
    j++
  }
  embedArray.forEach(function(embed,i) {
    embed.setFooter('page ' + (i+1) + '/' + embedArray.length);
    messageObj.author.send(embed);
  })
}

function list(messageObj){
  const embed = new Discord.RichEmbed;
  let embedArray = [embed];
  let j = 0;
  let k = 0;
  embedArray[0].setTitle('List with birthdays in DD-MM-YYYY')
  for(var i = 0; i < this.birthdays.length; i++){
    if (j === 24){
      j=0;
      embedArray[k].addField(getName(this.birthdays[i].member, messageObj), this.birthdays[i].displayDate());
      embedArray.push(new Discord.RichEmbed());
      k++;
      return;
    }
    embedArray[k].addField(getName(this.birthdays[i].member, messageObj), this.birthdays[i].displayDate());
    j++
  }
  embedArray.forEach(function(embed,i) {
    embed.setFooter('page ' + (i+1) + '/' + embedArray.length);
    messageObj.author.send(embed);
  })
}

function settingsList(messageObj){
  let list ="birthdaymessage: " + this.birthdayMessage  + "\nannouncechannel: #" + getChannel(this.announceChannel, messageObj.guild).name +
  "\nhour: " + this.announceTimeHour + "\nmin: " + this.announceTimeMin + "\nmentioneveryone: " + this.tagEveryone + "\ncolor: " + this.color;
   messageObj.channel.send(list);
}

function getBirthdays(){
  var currentDate = new Date();
  let allBirthdays = this.birthdays;
  let today = [];
  allBirthdays.forEach(birthday =>{
    if((birthday.month - 1) == (currentDate.getUTCMonth()) && birthday.day == currentDate.getUTCDate()){
      today.push(birthday);
    }
  })
  return today;
}

function announceBirthdays(guild){
  require(path.join(__dirname,'..','commands','methods.js'))();
  const embed = new Discord.RichEmbed;
  var rand = Math.floor(Math.random() * this.images.length)
  let embedArray = [embed];
  let toAnnounce = this.getBirthdays();
  let announceChannel = getChannel(this.announceChannel, guild);
  let j = 0;
  let k = 0;
  if (this.tagEveryone){
    announceChannel.send('@everyone');
  }
  embedArray[0].setTitle(this.birthdayMessage)
  for(var i = 0; i < toAnnounce.length; i++){
    if (j === 24){
      j=0;
      embedArray[k].addField(getName(toAnnounce[i].member, guild), toAnnounce[i].showAge() );
      embedArray.push(new Discord.RichEmbed());
      k++;
      return;
    }
    embedArray[k].addField(getName(toAnnounce[i].member, guild), toAnnounce[i].showAge() );
    j++
  }
  for(var l = 0; l < embedArray.length; l++){
    embedArray[l].setColor(parseInt(this.color));
    embedArray[l].setImage(this.images[rand]);
    embedArray[l].setFooter('page ' + (l+1) + '/' + embedArray.length);
    announceChannel.send(embed);
  }
}




function importBirthdays(listToConvert){
  let objectList =[];
  var list = listToConvert;
  list.forEach(i => {
    let birthDayElement = new Birthday(i.member, i.day, i.month, i.year);
    objectList.push(birthDayElement);
  })
  return objectList;
}

function importFile(fileToImport){
  this.birthdays = importBirthdays(fileToImport.birthdays);
  this.images = fileToImport.images;
  this.birthdayMessage = fileToImport.birthdayMessage;
  this.announceChannel = fileToImport.announceChannel;
  this.announceTimeHour = fileToImport.announceTimeHour;
  this.announceTimeMin = fileToImport.announceTimeMin;
  this.color = fileToImport.color;
  this.tagEveryone = fileToImport.tagEveryone;
  this.announcedToday = fileToImport.announcedToday;
}


module.exports = BirthdayList;
