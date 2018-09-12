exports.run = (client, message, args, guildConfig) => {
  if(message.member.user.id === '348822302458380288'){
    client.user.setPresence({ game: { name: args.join(' ') }, status: 'online' })
    .then(send.channel.message("Status is updated!"))
    .catch(console.error);

  }
}
