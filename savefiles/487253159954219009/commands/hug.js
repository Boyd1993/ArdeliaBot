exports.run = (client, message, args, guildConfig) => {

  client.commands.get('botcomm').run(client, message, args , guildConfig);

}