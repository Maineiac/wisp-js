const request = require('../../../request');
const config = require('../../../../../config');
const table = require('text-table');
module.exports = async function(args) {
    let obj = {
        title: {
            text:`Allocation List | Node ${args[3]}`,
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
    let array = [["ID", "Connection", "Assigned"]];
    try {
        data = await request.get(`/nodes/${args[3]}/allocations?page=${page}`);
    } catch(error) {
        return errors(error, 'admin/allocation/list.js : line 20');
    }
    const allocations = data.data;
    for(i = 0; i < allocations.length; i++) {
        array[i+1] = [

            allocations[i].attributes.id,
            `${allocations[i].attributes.ip}:${allocations[i].attributes.port}`,
            allocations[i].attributes.assigned
        ]
    }
    obj.desc = `Page ${page}/${data.meta.pagination.total_pages}\`\`\`${table(array, { align: [ 'c', 'c', 'c' ], hsep: [ '   ' ] })}\`\`\``;
    return obj;
}