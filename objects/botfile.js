function BotFile(link, descriptions = []){
  this.link = link;
  this.descriptions = descriptions;
  this.addDescriptions = addDescriptions;
  this.delDescriptions = delDescriptions;
  this.setDescription = setDescription;
  this.chooseDescription = chooseDescription;
  this.descriptionsList = descriptionsList;
}

function addDescriptions(descriptions){
  for (var i = 0; i < descriptions.length; i++){
    this.descriptions.push(descriptions[i]);
  }
}

function delDescriptions(IDs){
  IDs.sort(function(a,b){ return b - a; })
  let countFails = 0;
  let lastID = -1;
  for (var i = 0; i < IDs.length; i++){
    if(!isNaN(IDs[i]) && IDs[i] >= 0 && IDs[i] < this.descriptions.length && lastID !== IDs[i]){
      this.descriptions.splice(IDs[i],1);
      lastID = IDs[i];
    }
    else{
      countFails++;
      lastID = IDs[i];
    }
  }
  return countFails;
}

function setDescription(id , newMessage){
  this.descriptions[id] = newMessage;
}

function chooseDescription(id = -1){
  if(this.descriptions.length !== 0){
    if(id >= -1 && id < this.descriptions.length && !isNaN(id)){
      if(id === -1){
        let randId = Math.floor(Math.random() * Math.floor(this.descriptions.length));
        let description = this.descriptions[randId];
        return description;
      }
      else {
        let description = this.descriptions[id];
        return description
      }
    }
    else {
      let output = -2;
      return output;
    }
  }
  else{
    let description = -1;
    return description;
  }

}

function descriptionsList(){
  let listArray = [];
  let list = '';
  this.descriptions.forEach(function(message,i) {
    list =  list + i + ': ' + message.join(' ') + '\n';
    if (list.length > 1500){
      listArray.push(list);
      list = '';
    }
  })
  listArray.push(list);
  return listArray;
}
module.exports = BotFile;
