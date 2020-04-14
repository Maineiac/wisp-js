const request = require('../../request');
const config = require('../../../../config');
const errors = require('../../error');

const table = require('text-table');

module.exports = async function(args) {

    let obj = {
        title: {
            text:`Location List`,
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
    let array = [["ID", "Location"]];

    try {
        data = await request.get(`/locations?page=${page}`);

    } catch(error) {
        return errors(error, 'admin/location/list.js : line 26');

    }

    const locations = data.data;

    for(i = 0; i < locations.length; i++) {

        array[i+1] = [

            locations[i].attributes.id,
            locations[i].attributes.long

        ]
    }

    obj.desc = `Page ${page}/${data.meta.pagination.total_pages}\n
    \`\`\`${table(array, { align: [ 'r', 'l' ], hsep: [ '     ' ] })}\`\`\``;
    
    
return obj;
}