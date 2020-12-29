const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../../config.json');

exports.run = (client, message, args) => {
    let platform = 'epic';
    let timewindow = 'lifetime';
    if(args[1]){
        let arg1 = args[1];
        if(arg1 == 'playstation' || arg1 == 'ps4' || arg1 == 'ps5' || arg1 == 'psn')
            platform = 'psn';
        else if(arg1 == 'xbl' || arg1 == 'xbox')
            platform = 'xbl';
        else if(arg1 == 'epic' || arg1 == 'epic games' || arg1 == 'egs')
            platform = 'epic';
        else
            return message.channel.send(`${message.author} sorry. Wrong arguments.`);

        if(args[2]) {
            let arg2 = args[2];
            if(arg2 == 'lifetime' || arg2 == 'forever' || arg2 == 'all')
                timewindow = 'lifetime';
            else if(arg2 == 'season')
                timewindow = 'season';
            else
                return message.channel.send(`${message.author} sorry. Wrong arguments.`);
        }
        else return message.channel.send(`${message.author} sorry. Wrong number of arguments.`);
    }


    console.log(args);
    superagent.get('https://fortnite-api.com/v1/stats/br/v2')
        .query({name: args[0], accountType: platform, timeWindow: timewindow, image:'all'})
        .end((err, response) => {
            if(err && err.status == 404) {
                message.channel.send('404 Error. That was probably the wrong username.')
                return;
            }
            else if(err) {
                message.channel.send('Something went wrong. The API might be down.')
                console.log('--- Error in fortnite.js ---')
                return console.log(err);
            }

			message.channel.send(response.body.data.image);
        });

}
exports.help = {
	name: 'fortnite',
	category: 'Games',
	usage: 'fortnite <playername> [platform] [timeframe]',
	help: 'For losers',
	dev: false
}

exports.config = {
	enabled: true,
	guildOnly: false,
	permissionLevel: 1,
	aliases: [ 'fn' ],
	perms: [  ]
};
