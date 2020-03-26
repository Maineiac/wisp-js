const Discord = require("discord.js");
const config = require('../../config.js');
const format = require('./format.js');
module.exports = async function(type, data=null) {
    const embed = new Discord.MessageEmbed();
    let prop = {};
    switch(type) {
        case 'status':
            prop = await format.ServerStatus(data);
            embed.setAuthor("Server Status", config.icons.status)
        break;
        
        case 'players':
            prop = await format.PlayerList(data);
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

        case 'servers':
            prop = await format.ServerList(config.servers);
            embed.setAuthor("Server List", config.icons.serverlist);
        break;
    }
    embed.setTitle(prop.name)
    .setColor(prop.color)
    .setTimestamp();
    if (prop.desc) { embed.setDescription(prop.desc) }
    return {embed};
}