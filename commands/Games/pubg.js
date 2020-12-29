const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../config.json');
const auth = require('../../auth.json');

exports.run = (client, message, args) => {
    let platform = 'steam';
    if(!args[0]) return message.channel.send('Please specify a player');
    let player = args[0];

    superagent.get(`https://api.pubg.com/shards/${platform}/players/${player}/seasons/lifetime`)
        .set('Authorization', `Bearer ${auth.pubg_api_key}`)
        .set('Accept', 'application/vnd.api+json')
        .end((err, response) => {
            if(err && err.status == 404) {
                message.channel.send('404 Error. That was probably the wrong username.')
                return;
            }
            else if(err && err.status == 429) {
                message.channel.send('Too many requests. Please try again in a minute.')
                return;
            }
            else if(err) {
                message.channel.send('Something went wrong. The API might be down.')
                console.log('--- Error in pubg.js ---')
                return console.log(err);
            }

            let data = response.body.data.attributes.gameModeStats['squad'];

            const embed = new Discord.MessageEmbed()
				.setTitle(args[0] + "\'s **Squad FPP** Stats")
				//.setAuthor(client.user.username, client.user.avatarURL)
				.addField("Kills",data.kills,true)
				.addField("Deaths",data.losses,true)
				.addField("DBNOs",data.dBNOs,true)
				.addField("Assists",data.assists,true)
				.addField("Headshot Kills",data.headshotKills,true)
				.addField("Damage",data.damageDealt,true)
				.addField("Longest Kill",data.longestKill,true)
				.addField("Wins",data.wins,true)
				.addField("Road Kills",data.roadKills,true)
				.addField("Most Kills in Round",data.roundMostKills,true)
				.addField("Team Kills",data.teamKills,true)
				.addField("Top 10s",data.top10s,true)

				.setThumbnail("https://pubattlegroundstips.com/wp-content/uploads/2018/02/pubg-orange-square.png")
				.setColor(config.embed_color)
				.setFooter("Try adding a gamemode parameter to see stats for different gamemodes.")
				.setTimestamp()

				.setDescription((data.kills/data.losses).toString().substring(0,4) + " Kill/Death Ratio\n"
									+ (data.wins/data.roundsPlayed*100).toString().substring(0,4) + "% Winrate")
			message.channel.send(embed);
        });

}
exports.help = {
	name: 'pubg',
	category: 'Games',
	usage: 'pubg <playername> [platform] [timeframe]',
	help: 'For losers',
	dev: false
}

exports.config = {
	enabled: true,
	guildOnly: false,
	permissionLevel: 1,
	aliases: [  ],
	perms: [  ]
};
