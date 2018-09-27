exports.run = (client, message, args,guidConfig, permission) => {
  if(permission){
    const path = require('path')
    let filePath = path.join(__dirname, '..', 'savefiles', message.guild.id, 'botcommands.json');

      delete require.cache[require.resolve(filePath)];

  }
};
