const Discord = require("discord.js");
const config = require('../../config.js');
module.exports = async function(prop) {
    const embed = new Discord.MessageEmbed();
    if (prop.title) { embed.setAuthor(prop.title.text, prop.title.icon) }
    if (prop.head) { embed.setTitle(prop.head) }
    if (prop.color) { embed.setColor(prop.color) }
    if (prop.footer) { embed.setFooter(prop.footer.text, prop.footer.icon) }
    if (prop.desc) { embed.setDescription(prop.desc) }
    embed.setTimestamp();
    return embed;
} 