'use strict';
module.exports = function (app) {
    const path = require("path");
    var botCommands = require(path.join(__dirname, "..", "controllers", "botCommandsController"));

    //botCommands routes
    app.route("/botcommands/list").
        get(botCommands.list);
}