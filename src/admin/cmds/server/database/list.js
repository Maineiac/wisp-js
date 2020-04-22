const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);

const table = require('text-table');

module.exports = async function(args) {

    let obj = util.baseEmbedObj(args);
    let data;
    let array = [["ID", "Name"]];

    try {
        data = await request.get(`/servers/${args[3]}/databases`);

    } catch(error) {
        return errors(error, 'admin/list/database.js : line 26');

    }

    const databases = data.data;

    for(i = 0; i < databases.length; i++) {

        array[i+1] = [

            databases[i].attributes.id,
            databases[i].attributes.database

        ]
    }

    obj.desc = `\n
    \`\`\`${table(array, { align: [ 'c', 'l' ], hsep: [ '   ' ] })}\`\`\``;
    
    
return obj;
}