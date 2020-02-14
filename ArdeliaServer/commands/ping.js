exports.run = (client, message, args, guildConfig) => {
    const path = require("path");
    const commonpaths = require(path.join(__dirname, "..", "common", "commonpaths.js"));
    require(commonpaths.commonMethods)();

    if (isModerator(message.member, guildConfig)) {
        message.channel.send("pong!").catch(console.error);
        console.log(message.member.user.id);
    }
}
