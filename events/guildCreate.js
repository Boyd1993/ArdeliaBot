module.exports = (client, guild) => {

  const fs = require("fs");
  require('../commands/methods.js')();
  writeNewSaveFile(guild.id,fs);

  };
