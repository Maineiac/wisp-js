const Discord = require("discord.js");
const config = require('../../config.js');
const format = require('./format.js');
module.exports = async function(type, data=null) {
    const embed = new Discord.MessageEmbed();
    let prop = {};
    switch(type) {
        case 'status':
            prop = await format.ServerStatus(data);
            embed.setAuthor(config.embeds.status.title, config.embeds.status.icon)
        break;
        
        case 'players':
            prop = await format.PlayerList(data);
            embed.setAuthor(config.embeds.players.title, config.embeds.players.icon)
        break;

        case 'cmd':
            prop.name = "Success";
            prop.color = config.embeds.cmd.color.success;
            prop.desc = "Sent command : `"+data+"`";
            embed.setAuthor(config.embeds.cmd.title, config.embeds.cmd.icon);
        break;

        case 'power':
            prop.name = "Success";
            prop.color = config.embeds.power.color.success;
            prop.desc = "Sent signal : `"+data+"`";
            embed.setAuthor(config.embeds.power.title, config.embeds.power.icon);
        break;

        case 'servers':
            prop = await format.ServerList(config.servers);
            embed.setAuthor(config.embeds.serverlist.title, config.embeds.serverlist.icon);
        break;

        case 'help':
            prop = await format.ClientHelp(config.prefix);
            embed.setAuthor(config.embeds.help.title, config.embeds.help.icon);
        break;
    }
    embed.setTitle(prop.name)
    .setColor(prop.color)
    .setTimestamp()
    .setFooter(config.embeds.footer.text, config.embeds.footer.icon);
    if (prop.desc) { embed.setDescription(prop.desc) }
    return {embed};
}