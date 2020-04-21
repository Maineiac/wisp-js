const Discord = require("discord.js");

/* embed.js expects an object

embed = {
        title: {
            text: string,
            icon: string
        },
        color: int,
        desc: string,
        fields: [
            [title, text, inline],
            [title, text, inline],
            ...
        ]
        footer: {
            text: string,
            icon: string
        }
    }
*/

module.exports = async function (prop) {
    
    if (prop) {
        const embed = new Discord.MessageEmbed();
        
        if(prop.title) {
            embed.setAuthor(
                (prop.title.text) ? prop.title.text : "", 
                (prop.title.icon) ? prop.title.icon : ""
            );
        }

        embed.setTitle((prop.head) ? prop.head : "");

        embed.setColor((prop.color) ? prop.color : "");

        embed.setDescription(
            (prop.desc) ? prop.desc : "It seems odd there is nothing here..."
        )

        if(prop.fields) {
            for(const a of prop.fields) {
                embed.addField(a[0], a[1], a[2]);
            }
        }

        if(prop.footer) {
            embed.setFooter(
                (prop.footer.text) ? prop.footer.text : "??", 
                (prop.footer.icon) ? prop.footer.icon : ""
            );
        }

        embed.setTimestamp();

        return embed;

    } else {
        return "Something really bad happened...";

    }
} 