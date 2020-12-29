const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../../config.json');

exports.run = (client, message, args) => {
    superagent.get('https://dbd-stats.info/api/shrineofsecrets')
        .end((error, response) => {
            if(error) {
                console.log('---Error in shrine.js GET 1--');
                message.channel.send(`${message.author} sorry. Could not reach dbd-stats.info`)
                return console.log(error);
            }
            let data = response.body.items;

            superagent.get('https://dbd-stats.info/api/perks')
                .end((err, res) => {
                    if(err) {
                        console.log('---Error in shrine.js GET 2--');
                        message.channel.send(`${message.author} sorry. Could not reach dbd-stats.info`)
                        return console.log(error);
                    }
                    console.log(data[0].id);

                    const embed = new Discord.MessageEmbed()
                        .setColor(config.embed_color)
                        .setTitle('Shrine of Secrets')
                        .setDescription(`Valid from ${response.body.startDate} to ${response.body.endDate}`)
                        .addFields(
                            { name: data[0].Name, value: ' test', inline: true },
                            { name: data[1].Name, value:' test' , inline: true },
                            { name: data[2].Name, value:' test' , inline: false },
                            { name: data[3].Name, value:' test' , inline: true }
                        );
                    message.channel.send(embed);
            });
    });

}
exports.help = {
	name: 'shrine',
	category: 'Games',
	usage: 'shrine',
	help: 'DBD Shrine of Secrets',
	dev: false
}

exports.config = {
	enabled: true,
	guildOnly: false,
	permissionLevel: 1,
	aliases: [  ],
	perms: [  ]
};
