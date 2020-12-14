const cleverbot = require("cleverbot-free");
const Queue = require('../utils/queue.js');

let q = new Queue();
exports.run = (message) => {
    while(q.length() > 15) q.pop();
    if(message.author.bot) return;
    if(message.channel.id == 419239921245749249) {
        cleverbot(message.content, q.arr()).then(response => {
            q.push(message.content);
            q.push(response);
            message.channel.send(response)
        });
    }

}
