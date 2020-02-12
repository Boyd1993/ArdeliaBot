exports.run = (client, message, args, guildConfig) => {
  if(message.guild.id == 327540188807036929){
    if(message.channel.id == 525229064064073738){
      message.channel.fetchMessages()
      .then(messages =>{
        message.channel.bulkDelete(messages.size - 2)
        .then()
        .catch(console.error);
      })

      .catch(console.error);
    }
  }
}
