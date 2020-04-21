const request = require(`${process.env.root}/src/admin/request`);
const config = require(`${process.env.root}/config`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);
const fs = require('fs');
const _ = require('underscore');
const table = require('text-table');
module.exports = async function(args) {

    let obj = {
        title: {
            text: `Database Creator | Server ${args[3]}`,
            icon: config.embeds.servers.icon
        },
        color: config.embeds.servers.color,
        desc: "",
        footer: {
            text: config.embeds.footer.text,
            icon: config.embeds.footer.icon
        }
    };

    try {
        
        const data = await request.post(`/servers/${args[3]}/databases`, {"host": args[5], "database": args[4], "remote": (args[6]) ? args[5] : `%`});

        const array = util.cleanArray(

            [[`Property`, `Value`]].concat(
                Object.entries(data.data.attributes)
            )

        );

        obj.desc = `Sent data to panel.\n\`\`\`${table(array, { align: [ 'r', 'l'], hsep: [ '   ' ] })}\`\`\``;
        
        return obj;

    } catch(error) {
        return errors(error, 'admin/server/create.js : line 33');

    }
}