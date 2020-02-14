module.exports = (client, member) => {
    const fs = require("fs");
    const path = require('path');
    const commonpaths = require(path.join(__dirname, "..", "common", "commonpaths"));
    require(commonpaths.commonMethods)();
    const welcome = client.commands.get('welcome');
    let message = {
        guild: member.guild,
        member: member
    }
    welcome.run(client, message, ['announce'], ' ', true)
};
