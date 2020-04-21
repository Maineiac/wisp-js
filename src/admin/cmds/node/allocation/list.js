const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);

const table = require('text-table');


module.exports = async function(args) {

    const page = (args[4]) ? args[4] : 1;
    let obj = util.baseEmbedObj(args);
    let data;
    let array = [["ID", "Connection", "Assigned"]];

    try {
        data = await request.get(`/nodes/${args[3]}/allocations?page=${page}`);

    } catch(error) {
        return errors(error, 'admin/allocation/list.js : line 26');

    }

    const allocations = data.data;

    for(i = 0; i < allocations.length; i++) {

        array[i+1] = [

            allocations[i].attributes.id,
            `${allocations[i].attributes.ip}:${allocations[i].attributes.port}`,
            allocations[i].attributes.assigned

        ]
    }

    obj.desc = `Page ${page}/${data.meta.pagination.total_pages}\n
    \`\`\`${table(array, { align: [ 'c', 'c', 'c' ], hsep: [ '   ' ] })}\`\`\``;
    
    
return obj;
}