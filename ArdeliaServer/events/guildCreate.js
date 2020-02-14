module.exports = (client, guild) => {
    const fs = require("fs");
    const path = require('path');
    const commonpaths = require(path.join(__dirname, "..", "common", "commonpaths"));
    require(commonpaths.commonMethods)();
    writeNewSaveFile(guild.id, fs);
};
