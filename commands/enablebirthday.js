exports.run = (client, message, args, guildConfig) => {
  const path = require('path');
  require(path.join(__dirname,'.','methods.js'))();

  if(isAdmin(message.member,guildConfig)){
    if (args.length != 0){
      const fs = require('fs');
      let filename = 'birthday.js';
      let src = path.join(__dirname,'..', 'objects' , filename);
      let dest = path.join(__dirname,'..','savefiles', message.guild.id, 'commands', filename);
      let saveFile = path.join(__dirname,'..','savefiles', message.guild.id, 'birthdays.json');

      fs.access(dest, (err) => {
        if(err){
          if(err.code == 'ENOENT'){
            copyFile(src, dest);
            message.channel.send('Birthday module is enabled! If you already had birthday enabled another time the old savefile is loaded. Otherwise, as default I will announce the birthdays at 12.00 UTC.'+
            'If you want another time please use !birthday sethour <hour in 0-23> and !birthday setmin <min in 0-59> with time in UTC. You can also add some fancy images with !birthday addimg <links>.'+
            ' For all settings see !birthday settings. You can edit all settings with !birthday set<setting> <new value>. For more help use !help birthday');
            let birthdayMessage = args.join(' ');
            var BirthdayList = require(path.join(__dirname,'..','objects', 'birthdaylist.js'));
            var birthdayList = new BirthdayList(birthdayMessage, message.channel.id);
            fs.open(saveFile, 'wx', (err, fd) => {
              if (err) {
                if (err.code === 'EEXIST') {
                  console.error('myfile already exists');
                  return;
                }

                throw err;
              }
              fs.write(fd, JSON.stringify(birthdayList, null , ' '), (err) =>{
                if (err){console.error('Write failed');}
                fs.close(fd, (err) =>{
                  if (err){console.error('Write failed'); throw err;}
                })
              })
            });
          }
        }
        else{message.channel.send('Birthday module is already enabled!')}
      });
      function copyFile(src, dest) {
        let readStream = fs.createReadStream(src);
        readStream.once('error', (err) => {
          console.log(err);
        });
        readStream.pipe(fs.createWriteStream(dest));
      }
    }
    else {
      message.channel.send('Please add an birthday message.')
    }
  }
}
