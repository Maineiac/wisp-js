const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);

const table = require('text-table');

module.exports = async function(args) {
    
    const page = (args[4]) ? args[4] : 1;
    let obj = util.baseEmbedObj(args);
    let data;
    let array = [["ID", "Identifier", "Name"]];

    try {
        data = await request.get(`/servers?page=${page}`);

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