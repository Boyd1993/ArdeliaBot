module.exports = function(){

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

        outputString=outputString + "**" + messageObj.author.username + "** ";
      return;
      }
      if(word === '$(2)' && messageObj.mentions.members.size !== 0){
        outputString = outputString +"**" + messageObj.mentions.members.first().user.username + "** ";
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

}
