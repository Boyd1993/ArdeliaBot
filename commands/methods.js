module.exports = function(){
  const path = require('path');

  this.getRoleNames = function(roleList){
    let roleNames = [];
    roleList.tap(role => {
      roleNames.push(role.name);
    })
    return roleNames;
  };

  this.checkRoleExist = function(role,roleList){
    let toReturn = false;
    if (roleList.includes(role)){
      toReturn = true;
      return toReturn;
    }
    else{return toReturn;}
  };

  this.getNewConfigFile = function(configFile,setting,newValue){

    configFile[setting] = newValue;

    return configFile;
  }

  this.getRoleNameIdList = function(roleList){
    let roleIdNameList ={};
    roleList.tap(role => {
      let roleName = role.name;
      let roleId = role.id;
      roleIdNameList[roleName] = roleId;
    })
    return roleIdNameList;
  };

  this.getRoleId = function(roleNamesIdList, name){
    let roleId = roleNamesIdList[name];
    return roleId;
  };

  this.CheckSettingExist = function(configFile,setting){
    let check = false;
    Object.keys(configFile).forEach(function(settings, i){

      if(settings === setting){check = true;}

    })
    return check;
  }

  this.CheckFileExcist = function(files,name){
    var isTrue = false;
    files.forEach(file => {
      if (name + '.js' == file) {
        isTrue = true;
        return isTrue;
      }})

      return isTrue;
    }

    this.hasRole = function(user,permittedList){
      let userRoles = user.roles.keyArray();
      let toReturn = false;
      userRoles.forEach(role => {
        if(permittedList.includes(role)){
          toReturn = true;
        }
      })
      return toReturn;
    };

    this.listModeratorRoles = function(configFile){
      let roleList = [];
      roleList = configFile['moderatorRoles'];
      return roleList
    };

    this.listEditorRoles = function(configFile){
      let roleList = [];
      roleList = configFile['editorRoles'];
      return roleList
    };
    this.isEditor = function(user,configFile){
      let toReturn = false;
      if(user.hasPermission('ADMINISTRATOR') || hasRole(user, listEditorRoles(configFile)) || hasRole(user, listModeratorRoles(configFile))){
        toReturn = true;
        return toReturn;
      }
      else{return toReturn;}
    }

    this.isModerator = function(user,configFile){
      let toReturn = false;
      if(user.hasPermission('ADMINISTRATOR') || hasRole(user, listModeratorRoles(configFile))){
        toReturn = true;
        return toReturn;
      }
      else{return toReturn;}
    }

    this.isAdmin = function(user){
      let toReturn = false;
      if(user.hasPermission('ADMINISTRATOR')){
        toReturn = true;
        return toReturn;
      }
      else{return toReturn;}
    }
    this.delElement = function(array,toDel){
      let arrayDelId = array.indexOf(toDel);
      array.splice(arrayDelId,1);
      return array;
    }

    this.lineGen = function(argsArray,messageObj){
      let outputString = "";
      argsArray.forEach(word => {
        if(word === '$(1)'){

          outputString=outputString + "**" + messageObj.member.displayName + "** ";
          return;
        }
        if(word === '$(2)' && messageObj.mentions.members.size !== 0){
          outputString = outputString +"**" + messageObj.mentions.members.first().displayName + "** ";
          return;
        }
        if (word === '$(2)' && messageObj.mentions.members.size === 0) {
          outputString = outputString + " "
          return;
        }
        outputString = outputString + word + " ";
      })
      return outputString;
    }

    this.isUrl = function(str)
    {
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

    this.linkSplitter = function(argsArray,messageObj){
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
      return [links,descriptions];
    }

    this.writeNewSaveFile = function(guildId, fileSystem){
      fileSystem.mkdir('../ArdeliaBot/savefiles/'+ guildId, function(err) {
        if (err) {
          if (err.code == 'EEXIST') console.log('already exists');// ignore the error if the folder already exists
          else console.error(err); // something else went wrong
        }
        else {
          var config ={prefix : "!", embedcolor:"3447003",moderatorRoles:[], editorRoles:[]};
          var botCommandFile = {};
          console.log('ping');
          fileSystem.writeFile(path.join(__dirname,'..','savefiles', guildId , 'config.json'), JSON.stringify(config, null, ' '), (err) => console.error);
          fileSystem.writeFile(path.join(__dirname,'..','savefiles', guildId,'botcommands.json'), JSON.stringify(botCommandFile, null, ' '), (err) => console.error);
          fileSystem.mkdir(path.join(__dirname,'..','savefiles', guildId,'commands'), function(err) {
            if (err) {
              if (err.code == 'EEXIST') console.log('already exists');// ignore the error if the folder already exists
              else console.error(err); // something else went wrong
            }
            else {
              console.log('Folder commands created');} // successfully created folder
            });
            console.log('Folder created')
            return config;
          }; // successfully created folder
        })
      }
      this.splitInfoDescription = function(argsArray){
        let descriptions =[];
        let info = '';
        let description = [];
        let isInfo = false;
        argsArray.forEach(arg =>{
          if(arg === '<||>'){
            descriptions.push(description.splice(0,description.length));
            isInfo = true;
            return;
          }
          if(arg === '>|<'){
            descriptions.push(description.splice(0,description.length));
            return;
          }
          if(isInfo){
            info = info + arg + ' ' ;
            return;
          }
          description.push(arg);
        })
        descriptions.push(description);
        let outputArray = [descriptions,info];
        return outputArray;
      }

      this.splitDescriptions = function(argsArray){
        let descriptions =[];
        let description = [];

        argsArray.forEach(arg =>{
          if(arg === '>|<'){
            descriptions.push(description.splice(0,description.length));
            return;
          }
          description.push(arg);
        })
        descriptions.push(description);
        return descriptions;
      }

    }
