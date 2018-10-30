exports.run = (client, message, args, guildConfig) => {

  const channelWithText = client.guilds.get('487253159954219009').channels.get('488482833141202964');
  require('./methods.js')();

  if(args[0] === 'birthday'){
    channelWithText.fetchMessage("506949090404204545")
    .then(messageToSend => {
      const fetchedMsgContent = messageToSend.content
      message.author.send(fetchedMsgContent);
    })
    return;
  }

  if(isModerator(message.member,guildConfig)){
    channelWithText.fetchMessage("488492559648161794")
    .then(messageToSend => {
      const fetchedMsgContent = messageToSend.content
      message.author.send(fetchedMsgContent);
    })
  }
  if(isEditor(message.member,guildConfig)){
    channelWithText.fetchMessage("488694283310858250")
    .then(messageToSend => {
      const fetchedMsgContent = messageToSend.content;
      message.author.send(fetchedMsgContent);
    })
    channelWithText.fetchMessage("495015688822325259")
    .then(messageToSend => {
      const fetchedMsgContent = messageToSend.content;
      message.author.send(fetchedMsgContent);

    })
  }
  channelWithText.fetchMessage("488694365426941962")
  .then(messageToSend => {
    const fetchedMsgContent = messageToSend.content;
    message.author.send(fetchedMsgContent);
  })
}
