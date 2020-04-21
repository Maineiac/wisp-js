const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);

const table = require('text-table');

module.exports = async function(args) {

    let obj = util.baseEmbedObj(args);
    let data;
    let array = [["ID", "Name", "Location"]];

    try {
        data = await request.get('/nodes');

    } catch(error) {
        return errors(error, 'admin/node/list.js : line 25');

    }

    for(i = 0; i < data.data.length; i++) {
        array[i+1] = [

            data.data[i].attributes.id,
            data.data[i].attributes.name,
            data.data[i].attributes.location_id
        ]
    }

    obj.desc = '```'+table(array, { align: [ 'c', 'c', 'c' ], hsep: [ '   ' ] })+'```';

    return obj;

}