exports.run = (client, message, args, guildConfig) => {
  if(message.guild.id == 525229064064073738){
    if(message.channel.id == 525229064064073738){
      message.channel.fetchMessages()
      .then(messages =>{
        message.channel.bulkDelete(messages.size - 3)
        .then()
        .catch(console.error);
      })

      .catch(console.error);
    }
  }
}
