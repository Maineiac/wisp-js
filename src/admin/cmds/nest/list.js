const request = require(`${process.env.root}/src/admin/request`);
const config = require(`${process.env.root}/config`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);
const _ = require('underscore');
const table = require('text-table');

module.exports = async function() {

    let obj = {
        title: {
            text: "Nest List",
            icon: config.embeds.servers.icon
        },
        color: config.embeds.servers.color,
        footer: {
            text: config.embeds.footer.text,
            icon: config.embeds.footer.icon
        }
    };
    let array = [["ID", "Name"]];
    let data;
    try {
        data = await request.get('/nests');
    } catch(error) {
        return errors(error, 'admin/nest/list.js : line 20');
    }
    const nests = data.data;
    for(i = 0; i < nests.length; i++) {
        array[i+1] = [

            nests[i].attributes.id,
            nests[i].attributes.name,
            
        ]
    }

    obj.desc = '```json\n'+table(array, { align: [ 'r', 'l' ], hsep: [ '     ' ] })+'```';
    return obj;

}