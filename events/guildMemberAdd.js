module.exports = (client, member) => {
  const fs = require("fs");
  const path = require('path');
  require(path.join(__dirname,'..','commands', 'methods.js'))();
  const welcome = client.commands.get('welcome');
  let message = {
    guild : member.guild,
    member: member
  }
  welcome.run(client, message, ['announce'], ' ', true)
};
