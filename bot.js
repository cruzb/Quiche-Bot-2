const Discord = require('discord.js');
const client = new Discord.Client();

const auth = require('./auth.json');
const utils = require('./utils/chat-utils.js');
const command_utils = require('./utils/command-utils.js');


client.commands = new Discord.Collection(); //key: command names, val: path to command file
client.aliases = new Discord.Collection(); //key: aliases as defined in command.configs, val: path to command file
client.startTime = new Date();

client.on('ready', () => {
    //Populate command Collection
	const commandSetup = require("./utils/command-setup.js");
	commandSetup.run(client.commands, client.aliases);

    //TODO help file

    client.user.setActivity("!!help");
	client.startTime = Date.now();
    console.log('I am ready!');
});

client.on('message', (message) => {
    if (command_utils.checkCommandPermission(client, message)) {
      command_utils.processCommand(client, message)
    }
});
/*
client.on("error", (e) => console.error(e));
client.on("warn", (e) => console.warn(e));
client.on("debug", (e) => console.info(e));*/
client.login(auth.discord_token);
