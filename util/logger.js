module.exports.error = function (logMessage, guild) {

    const path = require('path');
    const fs = require('fs');
    const logFilePath = path.join(__dirname, "..", "logs", `${getDateNowString()}.txt`);

    fs.appendFile(logFilePath, formatMessage(), (err) => {
        console.error(err);
    });


    function getDateNowString() {
        return new Date().toISOString()
            .replace(/\T.+/, '');
    }

    function formatMessage() {
        var dateString = new Date().toISOString()
            .replace(/T/, ' ')
            .replace(/\..+/, '');
        return `${dateString}\t${guild.id}\t${guild.name}\tERROR:\t${logMessage}\n`;
    }
}

