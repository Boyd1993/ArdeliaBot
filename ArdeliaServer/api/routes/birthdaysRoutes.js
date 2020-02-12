'use strict';
module.exports = function (app) {
    const path = require("path");
    var birthdays = require(path.join(__dirname, "..", "controllers", "birthdaysController"));

    //botCommands routes
    app.route("/birthdays/list").
        get(birthdays.list);
}