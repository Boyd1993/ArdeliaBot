const fs = require("fs");
const path = require('path');
var file = require(path.join(__dirname,'..','savefiles','487253159954219009','botcommands.json'));
var BotCommandFile = require(path.join(__dirname,'..','objects','botcommandfile.js'));
var botCommands = new BotCommandFile();
botCommands.importFile(file);
let argsArray = ['https://cdn.discordapp.com/attachments/488653411034857473/500259775951536138/love95.gif','going to test', 'https://cdn.discordapp.com/attachments/488653411034857473/500259731269746688/love94.gif','https://cdn.discordapp.com/attachments/488653411034857473/500259838387814410/love99.gif'];

let isUrl = function(str){
  regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
  if (regexp.test(str))
  {
    return true;
  }
  else
  {
    return false;
  }
}





let links = [];
let descriptions =[];
let description = [];
let setDescription = false;
argsArray.forEach(word => {
  if(isUrl(word) && !setDescription){
    links.push(word);
    setDescription = true;
    return;
  }
  if(setDescription && !isUrl(word) && word !== '>|<'){
    description.push(word);
    return;
  }
  if(word === '>|<'){
    descriptions.push(description.splice(0,description.length));
    return;
  }
  if (isUrl(word) && setDescription) {
    links.push(word);
    descriptions.push(description.splice(0,description.length));
    return;
  }
})
descriptions.push(description);

console.log([links,descriptions]);
