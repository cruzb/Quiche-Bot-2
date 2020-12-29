const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../config.json');

exports.run = (client, message, args) => {
    superagent.get('https://dog.ceo/api/breeds/image/random')
        .end((err, response) => {
            if(err) {
                console.log('---Error in dog.js--');
                message.channel.send(`${message.author} sorry. Something went wrong :(`)
                return console.log(err);
            }

			const embed =  new Discord.MessageEmbed()
				.setImage(response.body.message)
				.setFooter('Powered by dog.ceo')
				.setColor(config.embed_color)
			message.channel.send({embed});
        });

}
exports.help = {
	name: 'dog',
	category: 'Fun',
	usage: 'dog',
	help: 'Woof!',
	dev: false
}

exports.config = {
	enabled: true,
	guildOnly: false,
	permissionLevel: 1,
	aliases: [  ],
	perms: [  ]
};
