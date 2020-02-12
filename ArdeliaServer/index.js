const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const path = require('path');
require('dotenv').config()

//startup api
try {
    var express = require("express"),
        app = express(),
        port = process.env.PORT || 11111;

    fs.readdir(path.join(__dirname, ".", "api", "routes/"), (err, files) => {
        if (err) { console.error("Cannot read routes directory"); throw err; }
        files.forEach(file => {
            var routes = require(path.join(__dirname, ".", "api", "routes", file));
            routes(app);
            console.log(`${file} is registered to the api`);
        });
    });

    app.listen(port);
    console.log('Ardelia RESTful API server started on: ' + port);
}
catch (e) {
    console.log(e);
    console.error("Something went wrong with setting up the api.");
}

//startup bot server
try {
    const client = new Discord.Client();
    console.log("Ardelia is now online!");
    client.on('error', console.error);
    client.fs = fs;

    fs.readdir("./events/", (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            const event = require(`./events/${file}`);
            let eventName = file.split(".")[0];
            client.on(eventName, event.bind(null, client));
        });
    });

    client.commands = new Enmap();

    fs.readdir("./commands/", (err, files) => {
        if (err) return console.error(err);
        files.forEach(file => {
            if (!file.endsWith(".js")) return;
            let props = require(`./commands/${file}`);
            let commandName = file.split(".")[0];
            client.commands.set(commandName, props);
        });
    });

    var myVar = setInterval(myTimer, 60000);

    function myTimer() {
        let keys = client.guilds;
        keys.tap(guild => {
            fs.access(path.join(__dirname, '.', 'savefiles', guild.id, 'commands', 'birthday.js'), fs.constants.F_OK, (err) => {
                if (err) { console.error; return; }
                let birthdayCom = require(path.join(__dirname, '.', 'savefiles', guild.id, 'commands', 'birthday.js'));
                birthdayCom.run(client, guild, 'index', 'index')
            });
        })
    }


    client.login(process.env.TOKEN);
}
catch (e){
    console.error("something went wrong in index.js", e);
}
