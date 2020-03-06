const config = require('../config.js');

module.exports = async function(msg) {
    if(msg.content.startsWith(config.prefix) && !msg.author.bot) { 
        try {
            let args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
            let result;
            result = await require('./client/cmds.js').listener(args);
            if(!result) { result = "Hey, buddy, something went wrong, but there was no error." }
            msg.channel.send(result);
        } catch(error) {
            console.log(error);
            msg.channel.send(error);
        }
    }
}