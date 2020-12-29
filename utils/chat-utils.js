const config = require('../config.json');

module.exports = {
    print: function (channel, str) {
        if(config.verbose)
            channel.send(str);
        return;
    },


    send: function (message, str) {
        message.channel.send(str);
    },


    reply: function (message, str) {
        message.channel.send(`${message.author} ${str}`);
    }
};
