module.exports = (client, guild) => {
  const fs = require("fs");
  const path = require('path');
  require(path.join(__dirname,'..','commands', 'methods.js'))();
  writeNewSaveFile(guild.id,fs);

  };
