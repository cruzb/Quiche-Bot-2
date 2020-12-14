const Discord = require("discord.js");
const superagent = require("superagent");
const config = require("../../config.json");

exports.run = (client, message, args) => {
    superagent.get('https://api.thecatapi.com/api/images/get')
        .query({format: 'json'})
        .end((err, response) => {
            if(err) {
                console.log("---Error in cat.js--");
                message.channel.send('${message.author} sorry. Something went wrong :(')
                return console.log(err);
            }

			const embed =  new Discord.MessageEmbed()
				.setImage(response.body[0].url)
				.setFooter("Powered by the cat api")
				.setColor(config.embed_color)
			message.channel.send({embed});
        });

}
exports.help = {
	name: "cat",
	category: "Fun",
	usage: "cat",
	help: "Cat!",
	dev: false
}

exports.config = {
	enabled: true,
	guildOnly: false,
	permissionLevel: 1,
	aliases: [  ],
	perms: [  ]
};
