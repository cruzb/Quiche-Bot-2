const config = require('../config.json');
const chat_utils = require('./chat-utils.js');

module.exports = {
    checkCommandPermission: function (client, message) {
        //check if message has prefix
        //do this first because most will exit out here
        if(!message.content.startsWith(config.prefix)) {
            //TODO handle non-command checks here if there should be any
            //if adding a chat point system it should go here

            return false;
        }

        //ignore other bots
        if(message.author.bot) return false;

        //check blacklisted users
        //TODO
        /*if(message.guild) {
            if(client.getBlacklist.get('${message.guild.id}-${message.author.id}')) return false;
        }*/

        //no reason to ignore command
        return true;
    },


    processCommand: function (client, message) {
        // process input and split args for use
        const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        // call seperate file with command code
        try{
            let commandFile;
            if(client.commands.get(command))
                commandFile = require(client.commands.get(command));
            else if(client.aliases.get(command))
                commandFile = require(client.aliases.get(command));
            else {
                if(config.verbose)
                    message.channel.send(`${message.author} invalid command. Type ${config.prefix}help to see a list of commands.`)
                return;
            }


          //check self and sender for permission to perform action, also if can be run in guild
            let hasPermission = checkForPermission(commandFile, message);
            if(hasPermission) commandFile.run(client, message, args);
        }
        catch (err) {
            console.error(err);
        }
    }
};

function checkForPermission(commandFile, message) {
	commandFile.config.perms.forEach((permission) => {
        //if user does not have permission do not let them run command
		if(!message.member.hasPermission(permission)) {
			chat_utils.reply(message, 'you don\'t have permission to do  that.');
			return false;
		}
        //if bot does not have permission to do that, do not try it
		if(!message.guild.me.hasPermission(permission)) {
			chat_utils.reply(message, ' I don\'t have permission to do that.');
			return false;
		}
	});
    //if command is not allowed for use in DMs and this is a DM, deny it
	if(!message.guild && commandFile.config.guildOnly) {
		chat_utils.reply(message, ' that command can only be used in a Discord server.');
		return false;
	}
    //if command is disabled no one can use it
	if(!commandFile.config.enabled) {
		chat_utils.reply(message, ' command is disabled.');
		    return false;
	}
    //if the command is dev only then only a user with the creator ID can use it
	if(commandFile.config.dev) {
		if(message.member.id != config.creatorID)
			return false;
	}

	return true;
}
