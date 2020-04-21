const request = require(`${process.env.root}/src/admin/request`);
const config = require(`${process.env.root}/config`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);
const _ = require('underscore');
const table = require('text-table');
module.exports = async function(args) {

    let obj = {
        title: {
            text:`Database list`,
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
    let array = [["ID", "Name"]];

    try {
        data = await request.get(`/servers/${args[3]}/databases`);
        console.log(data.data);

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