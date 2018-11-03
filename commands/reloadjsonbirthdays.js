exports.run = (client, message, args,guidConfig, permission) => {
  if(permission){
    const path = require('path')
    let filePath = path.join(__dirname, '..', 'savefiles', message.id, 'birthdays.json');

      delete require.cache[require.resolve(filePath)];

  }
};
