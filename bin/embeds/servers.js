const Discord = require("discord.js");
const config = require('../../config.js');
const func = require('./func.js');
module.exports = async function(type, data) {
    const embed = new Discord.MessageEmbed();
    let prop = {};
    switch(type) {
        case 'status':
            prop = await func.formatServerStatus(data);
            embed.setAuthor("Server Status", config.icons.status)
        break;
        
        case 'players':
            prop = await func.formatPlayerList(data);
            embed.setAuthor("Player List", config.icons.players)
        break;

        case 'cmd':
            prop.name = "Success";
            prop.color = 53611;
            prop.desc = "Sent command : `"+data+"`";
            embed.setAuthor("Remote Console", config.icons.cmd);
        break;

        case 'power':
            prop.name = "Success";
            prop.color = 53611;
            prop.desc = "Sent signal : `"+data+"`";
            embed.setAuthor("Remote Control", config.icons.power);
        break;
    }
    embed.setTitle(prop.name)
    .setColor(prop.color)
    .setTimestamp();
    if (prop.desc) { embed.setDescription(prop.desc) }
    return {embed};
}