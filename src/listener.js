const config = require('../config');

module.exports = async function(msg, roles) {
    if(msg.content.startsWith(config.prefix) && !msg.author.bot) { 
        try {
            let args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
            let result;
            result = await require('./client/cmds')(args);
            if(!result) { result = "There was an error communicating with the server. Please check your config." }
            msg.channel.send(result);
        } catch(error) {
            console.log(error);
            msg.channel.send(error);
        }
    }
}