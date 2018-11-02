exports.run = (client, message, args, guildConfig) => {
  if(message.member.user.id === '348822302458380288'){
    client.user.setPresence({ game: { name:  'https://twitter.com/Felanoraa' }, status: 'online' })
    .then(message.channel.send("Status is updated!"))
    .catch(console.error);

  }
}
