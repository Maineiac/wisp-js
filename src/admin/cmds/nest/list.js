const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);

const table = require('text-table');

module.exports = async function(args) {

    let obj = util.baseEmbedObj(args);

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