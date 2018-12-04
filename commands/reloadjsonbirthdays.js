exports.run = (client, guild, args,guidConfig, permission) => {
  if(permission){
    const path = require('path')
    let filePath = path.join(__dirname, '..', 'savefiles', guild.id, 'birthdays.json');

      delete require.cache[require.resolve(filePath)];

  }
};
