const settings = require(`${process.env.root}/config/settings`);
const _ = require('underscore');

module.exports = async function(msg) {
    if(msg.content.startsWith(settings.prefix) && 
    !msg.content.startsWith(`${settings.prefix}${settings.prefix}`) && 
    msg.content != settings.prefix &&
    !msg.author.bot) {  

        let result;
        let args = msg.content.slice(settings.prefix.length).trim().split(/ +/g);

        if(settings.enableClient) {
            result = await require('./client/parser')(args, msg.member.roles.member._roles);
            
        }
        if(settings.enableAdmin && !result) {
            result = await require('./admin/parser')(args, msg.member.roles.member._roles);

        }

        msg.channel.send((result) ? result : `Invalid command ${args[0]}`);


    }
}