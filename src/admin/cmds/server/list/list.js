const request = require(`${process.env.root}/src/admin/request`);
const config = require(`${process.env.root}/config`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);
const _ = require('underscore');
const table = require('text-table');
module.exports = async function(args) {

    let obj = {
        title: {
            text:`Server List`,
            icon: config.embeds.servers.icon
        },
        color: config.embeds.servers.color,
        footer: {
            text: config.embeds.footer.text,
            icon: config.embeds.footer.icon
        }
    };

    const page = (args[4]) ? args[4] : 1;
    let data;
    let array = [["ID", "Identifier", "Name"]];

    try {
        data = await request.get(`/servers?page=${page}`);
        console.log(data.data[0]);

    } catch(error) {
        return errors(error, 'admin/server/list.js : line 26');

    }

    const servers = data.data;

    for(i = 0; i < servers.length; i++) {

        array[i+1] = [

            servers[i].attributes.id,
            servers[i].attributes.identifier,
            servers[i].attributes.name

        ]
    }

    obj.desc = `Page ${page}/${data.meta.pagination.total_pages}\n
    \`\`\`${table(array, { align: [ 'c', 'c', 'c' ], hsep: [ '   ' ] })}\`\`\``;
    
    
return obj;
}