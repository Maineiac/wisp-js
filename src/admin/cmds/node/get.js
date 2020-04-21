const request = require(`${process.env.root}/src/admin/request`);
const config = require(`${process.env.root}/config`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);
const _ = require('underscore');
const table = require('text-table');

module.exports = async function(args) {
    let obj = {
        title: {
            text: "Node Viewer",
            icon: config.embeds.servers.icon
        },
        color: config.embeds.servers.color,
        footer: {
            text: config.embeds.footer.text,
            icon: config.embeds.footer.icon
        }
    };

    let data;

    try {
        data = await request.get(`/nodes/${args[2]}`);
    } catch(error) {
        return errors(error, 'admin/node/get.js : line 21');
    }

    const created = new Date(data.attributes.created_at).toDateString();
    const array = [
        [`Name:`, data.attributes.name],
        [`Node ID:`, data.attributes.id],
        [`Location ID:`, data.attributes.location_id],
        [`Memory:`, data.attributes.memory],
        [`Disk:`, data.attributes.disk],
        [`CPU:`, data.attributes.cpu],
        [`Created:`, created]
        
    ]
    obj.desc = `${data.attributes.description}\`\`\`${table(array, { align: [ 'r', 'l'], hsep: [ '   ' ] })}\`\`\``;
    return obj;
}