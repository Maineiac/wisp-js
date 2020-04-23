const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);

const table = require('text-table');

module.exports = async function(args) {

    let obj = util.baseEmbedObj(args);

    let data;
    let array = [["ID", "Name"]];

    try {
        data = await request.get(`/nests/${args[3]}/eggs`);

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