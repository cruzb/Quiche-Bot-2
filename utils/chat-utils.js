const config = require('../config.json');

module.exports = {
    print: function (channel, str) {
        if(config.verbose)
            channel.send(str);
        return;
    },

    
    reply: function (message, str) {
        message.channel.send(`${message.author} ${str}`);
    }
};
