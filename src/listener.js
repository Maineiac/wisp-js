const settings = require(`${process.env.root}/config/settings`);
const embed = require(`${process.env.root}/src/embed`);
const client = require(`${process.env.root}/src/client/parser`);
const admin = require(`${process.env.root}/src/admin/parser`);
const help = require(`${process.env.root}/src/shared/cmds/help`);

const _ = require('underscore');

module.exports = async function(msg) {
    if(msg.content.startsWith(settings.prefix) && 
    !msg.content.startsWith(`${settings.prefix}${settings.prefix}`) && 
    msg.content != settings.prefix &&
    !msg.author.bot) {  

        let result;
        let args = msg.content.slice(settings.prefix.length).trim().split(/ +/g);

        if(args[0] == 'help') {
            result = await help(args);
        }
        if(settings.enableClient && !result) {
            result = await client(args, msg.member.roles.member._roles);
            
        }
        if(settings.enableAdmin && !result) {
            result = await admin(args, msg.member.roles.member._roles);

        }

        msg.channel.send((result) ? (_.isObject(result)) ? await embed(result) : result : `Invalid command ${args[0]}`);


    }
}