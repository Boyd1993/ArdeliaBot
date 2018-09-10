exports.run = (client, message, args, guildConfig) => {
  require('./methods.js')();

  if(isEditor(message.member,guildConfig)){

    const botCommName = args[0].toLowerCase();
    const fs = require("fs");
    let filePath = "./savefiles/"+ message.guild.id+"/commands/";
    let toSave = "exports.run = (client, message, args, guildConfig) => {  client.commands.get('botcomm').run(client, message, args , guildConfig);}";
    let gifsPath = "../savefiles/"+ message.guild.id+ "/gifs.json"
    const gifs = require(gifsPath);

    function CheckFileExcist(files,name){
      var isTrue = false;
      files.forEach(file => {
        if (name + '.js' == file) {
          isTrue = true;
          return isTrue;
        }})

        return isTrue;
      }

      fs.readdir(filePath, (err, files) => {
        if (err) return console.error(err);
        if(!CheckFileExcist(files,botCommName)){
          let descr = args.slice(1,args.length);
          if(typeof descr != "undefined" && descr != null && descr.length != null && descr.length > 0){
            fs.writeFile(filePath + botCommName +'.js', toSave, (err) =>{
              message.channel.send('The command '+ botCommName + ' has been added.').catch(console.error);

              gifs[botCommName]= {"linkfile":[],"messageToUser" : descr} ;
              fs.writeFile("../ArdeliaBot/savefiles/"+message.guild.id+"/gifs.json", JSON.stringify(gifs, null, ' '), (err) =>{
                console.error;
              });
            });
          }
          else {message.channel.send('Please add an description.')}
        }
        else{
          message.channel.send('Command already exist');
        }
      });
    }
  }
