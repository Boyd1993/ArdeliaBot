const path = require('path');

function Birthday(member, day, month, year = null){
  this.member = member;
  this.day = day;
  this.month = month;
  this.year = year;
  this.displayDate = displayDate;
  this.showAge = showAge;
}

function displayDate(){
  if (this.year == null){
    let date = this.day +"-"+ this.month;
    return date;
  }
  else{
    let currentDate = new Date();
    if ((currentDate.getUTCMonth()+1 == this.month && currentDate.getUTCDate() >= this.day) || currentDate.getUTCMonth()+1 > this.month){
      let date = this.day +"-"+ this.month + "-" + this.year + "--> Did become " + (currentDate.getUTCFullYear() - this.year) + " years old";
      return date;
    }
    else{
      let date = this.day +"-"+ this.month + "-" + this.year + "--> Becomes " + (currentDate.getUTCFullYear() - this.year) + " years old";
      return date;
    }
  }
}

function showAge(){
  let age = "Happy birthday!";
  if(this.year != null){
    let currentDate = new Date();
    age = "Happy birthday! Congratulations with the " + (currentDate.getUTCFullYear() - this.year) + " years";
  }
  return age;
}
module.exports = Birthday;
