exports.run = (client, message, args, guildConfig) => {
  require('./methods.js')();
  console.log(lineGen(args));
  if(isModerator(message.member,guildConfig)){
    message.channel.send("pong!").catch(console.error);
    console.log(message.member.user.id);
}
}
