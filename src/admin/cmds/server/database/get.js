const request = require(`${process.env.root}/src/admin/request`);
const config = require(`${process.env.root}/config`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);
const _ = require('underscore');
const table = require('text-table');
module.exports = async function(args) {
    let id = args[3];
    let obj = {
        title: {
            text: "Database Lookup",
            icon: config.embeds.servers.icon
        },
        color: config.embeds.servers.color,
        footer: {
            text: config.embeds.footer.text,
            icon: config.embeds.footer.icon
        }
    };
    if(isNaN(args[3])) {
        const servers = await request.getRecursive(`/servers`);
        for(const s of servers) {
            console.log(s.attributes.identifier)
            if(args[3] == s.attributes.identifier) {
                id = s.attributes.id;
            }
        }
    }
    try {
        const data = await request.get(`/servers/${id}/databases/${args[4]}`);
        const created = new Date(data.attributes.created_at).toDateString();

        const array = [
            [`ID`, data.attributes.id],
            [`Server`, data.attributes.server],
            [`Host`, data.attributes.host],
            [`User`, data.attributes.username],
            [`Name`, data.attributes.database],
            [`Remote`, data.attributes.remote],
            [`Created`, created]
        ]
        
        obj.desc = `\`\`\`${table(util.cleanArray(array), { align: [ 'r', 'l'], hsep: [ '   ' ] })}\`\`\``;
        return obj;
    } catch(error) {
        return errors(error, 'admin/database/get.js : line 30');
    }
}