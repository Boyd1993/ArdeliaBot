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
        fs.unlink(filePath + botCommName +'.js',  (err) =>{
          if (err){
            return message.channel.send('Command does not exist').catch(console.error);
          }
          delete gifs[botCommName];
          message.channel.send('The command '+ botCommName + ' has been deleted.').catch(console.error);
          fs.writeFile("../ArdeliaBot/savefiles/"+message.guild.id+"/gifs.json", JSON.stringify(gifs, null, ' '), (err) =>{
            console.error;
          });
        });


      });
    }
  }
