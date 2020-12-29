const config = require('../../config.json');
const chat_utils = require('../../utils/chat-utils.js');

exports.run = (client, message, args) => {
	if(!config.allow_moderation) return;
	let target = message.mentions.members.first();
	let reason = args.join(" ");

	if(target.user.bot)
		return chat_utils.send(message, 'Nice try.');

	if(message.mentions.members.size == 0)
		return chat_utils.reply(message, ' you need to mention a user to ban.');

	if(!target.bannable)
		return chat_utils.reply(message, ' I\'m sorry, I\'m afraid you can\'t do that');

	else {
		target.ban(target.user.username + "#" + target.user.discriminator + " was banned by " + message.author.username + "#" + message.author.discriminator + " for reason: " + reason);
		return message.channel.send(message.author + " successfully banned " + target);
	}
}
//TODO

exports.help = {
	name: 'ban',
	category: 'Moderation',
	usage: 'ban <@user> [reason]',
	help: 'Ban a user from this server',
	dev: false
}


exports.config = {
	enabled: true,
	guildOnly: true,
	permissionLevel: 4,
	aliases: [  ],
	perms: [ 'BAN_MEMBERS' ]
};
