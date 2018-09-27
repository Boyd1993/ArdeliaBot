module.exports = (client, guild) => {
  const fs = require("fs");
  const paths = require('paths');
  require(paths.join(__dirname,'..','commands', 'methods.js'))();
  writeNewSaveFile(guild.id,fs);

  };
