module.exports = (client, guild) => {

  const fs = require("fs");
  const path = require('path');

  fs.mkdir('../ArdeliaBot/savefiles/'+ guild.id, function(err) {
    if (err) {
              if (err.code == 'EEXIST') console.log('already exists');// ignore the error if the folder already exists
              else console.error(err); // something else went wrong
          }
    else {
      var config ={prefix : "!", embedcolor:"3447003",moderatorRoles:[], editorRoles:[]};
      var gifs = {};
      fs.writeFile("../ArdeliaBot/savefiles/"+ guild.id + "/config.json", JSON.stringify(config, null, ' '), (err) => console.error);
      fs.writeFile("../ArdeliaBot/savefiles/"+ guild.id + "/gifs.json", JSON.stringify(gifs, null, ' '), (err) => console.error);
      fs.mkdir('../ArdeliaBot/savefiles/'+ guild.id+'/commands', function(err) {
        if (err) {
                  if (err.code == 'EEXIST') console.log('already exists');// ignore the error if the folder already exists
                  else console.error(err); // something else went wrong
              }
        else {
          console.log('Folder commands created');} // successfully created folder
      });
      console.log('Folder created')}; // successfully created folder
  }

  )

};
