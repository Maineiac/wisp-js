const Discord = require("discord.js");

module.exports = async function (prop) {
    
    if (prop) {
        const embed = new Discord.MessageEmbed();
        
        embed.setAuthor(
            (prop.title.text) ? prop.title.text : "??", 
            (prop.title.icon) ? prop.title.icon : ""
        );

        embed.setFooter(
            (prop.footer.text) ? prop.footer.text : "??", 
            (prop.footer.icon) ? prop.footer.icon : "")
        ;

        embed.setTitle((prop.head) ? prop.head : "");
        embed.setColor((prop.color) ? prop.color : "");
        embed.setDescription((prop.desc) ? prop.desc : "It seems odd there is nothing here...")
        embed.setTimestamp();

        return embed;

    } else {
        return "Something really bad happened...";

    }
} 