const request = require('../../../request');
const config = require('../../../../../config');
const errors = require('../../../error');

const table = require('text-table');

module.exports = async function(args) {

    let obj = {
        title: {
            text:`Egg List | Nest ${args[3]}`,
            icon: config.embeds.servers.icon
        },
        color: config.embeds.servers.color,
        footer: {
            text: config.embeds.footer.text,
            icon: config.embeds.footer.icon
        }
    };

    let data;
    let array = [["ID", "Name"]];

    try {
        data = await request.get(`/nests/${args[3]}/eggs`);
        console.log(data.data[0]);

    } catch(error) {
        return errors(error, 'admin/allocation/list.js : line 26');

    }

    const eggs = data.data;

    for(i = 0; i < eggs.length; i++) {

        array[i+1] = [

            eggs[i].attributes.id,
            eggs[i].attributes.name

        ]
    }

    obj.desc = `\`\`\`json\n${table(array, { align: [ 'c', 'c', 'c' ], hsep: [ '   ' ] })}\`\`\``;
    
    
return obj;
}