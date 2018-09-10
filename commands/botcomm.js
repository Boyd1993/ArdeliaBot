exports.run = (client, message, args, guildConfig) => {
  const Discord = require("discord.js");
  const fs = require("fs");
  const gifs = require("../savefiles/"+message.guild.id+"/gifs.json");
  require('./methods.js')();
  let wantedCommand = args[0];

  function CheckBotCommExist(gifFile,botComm){
    let check = false;
    Object.keys(gifFile).forEach(function(botCommGifs, i){
      if(botComm === botCommGifs){check = true;}

    })
    return check;
  }

  if(CheckBotCommExist(gifs,wantedCommand)){

      if(args[1] === 'add' && isEditor(message.member,guildConfig)){
        let links = args.splice(2,args.length);
        let numberOfNewLinks = links.length;
        links.forEach(function(link){
          gifs[wantedCommand].linkfile.push(link);
        })
        fs.writeFile("../ArdeliaBot/savefiles/"+message.guild.id+"/gifs.json", JSON.stringify(gifs, null , ' '), (err) => {
          message.channel.send(numberOfNewLinks+ " new gif(s) has been added to " + wantedCommand).catch(console.error);
        });


      }

      else if(args[1] === 'del' && isEditor(message.member,guildConfig)){
        let delids = args.splice(2,args.length).sort(function(a,b){ return b - a; });
        let numberOfDelGifs = delids.length;
        function deleteGifs(gifsFile,gifsToDelete,command){
          gifsToDelete.forEach(function(delid){
            gifsFile[command].linkfile.splice(delid,1);
          })
          return gifsFile;
        }
        fs.writeFile("../ArdeliaBot/savefiles/"+message.guild.id+"/gifs.json", JSON.stringify(deleteGifs(gifs,delids,wantedCommand), null, ' '), (err) => {
          message.channel.send(numberOfDelGifs + " gif(s) has been deleted").catch(console.error);
        });


      }
      else if(args[1] === 'edit' && isEditor(message.member,guildConfig)){
        let toEdit = args[2];
        let newSetting = args.slice(3, args.length);
        if(toEdit != 'linkfile' && gifs[wantedCommand].hasOwnProperty(toEdit)){
          gifs[wantedCommand][toEdit] = newSetting;
          fs.writeFile("../ArdeliaBot/savefiles/"+message.guild.id+"/gifs.json", JSON.stringify(gifs, null, ' '), (err) => {
            message.channel.send(toEdit + ' is set to ' + newSetting).catch(console.error);
          });
        }
        else {
          message.channel.send('This setting cannot by edited or does not exist.');
        }
      }


      else if(args[1] === 'list'){
        let customIndex = 0;
        const embed = new Discord.RichEmbed()
        const embedArray = [embed];
        let page =0;
        embedArray[0].setTitle("List of gifs with numbers page " + (page+1));
        embedArray[0].setColor(0x00AE86);
        gifs[wantedCommand].linkfile.forEach(function(link,i){
          embedArray[page].addField(i,link)
          customIndex++;
          if (customIndex === 24){
            message.channel.send(embedArray[page]).catch(console.error);
            customIndex = 0;
            page++;
            embedArray.push(new Discord.RichEmbed())
            embedArray[page].setTitle("List of gifs with numbers page " + (page+1))
            embedArray[page].setColor(0x00AE86)
          }
        })

        message.channel.send(embedArray[page]).catch(console.error);
      }



    else if(!isNaN(args[2])){
      let wantedGifId = args[2]
      if(wantedGifId < gifs[wantedCommand].linkfile.length && wantedGifId >= 0){
        const commandToMember = message.mentions.members.first();
        let gif = gifs[wantedCommand].linkfile[wantedGifId];
        let messageToUser = lineGen(gifs[wantedCommand].messageToUser,message);
        message.channel.send({embed: {
          color: guildConfig.embedcolor,
          description: messageToUser,
          "image": {
            "url": gif
          }
        }}).catch(console.error);

      }
      else{
        message.channel.send("Unvalid id. See ! " + wantedCommand + " list for valid ids." );
      }
    }
    else {
      const commandToMember = message.mentions.members.first();
      let id = Math.floor(Math.random() * Math.floor(gifs[wantedCommand].linkfile.length));
      let gif = gifs[wantedCommand].linkfile[id];
      let messageToUser = lineGen(gifs[wantedCommand].messageToUser,message);


      message.channel.send({embed: {
        color: guildConfig.embedcolor,
        description: messageToUser,
        "image": {
          "url": gif
        }
      }}).catch(console.error);
    }

  }
  else{message.channel.send('Botcommand does not exist')}

}
