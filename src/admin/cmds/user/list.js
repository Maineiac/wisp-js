const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);

const table = require('text-table');

module.exports = async function(args) {

    let obj = util.baseEmbedObj(args);
    let array = [["ID", "Username", "Type"]];
    let data;
    
    try {
        data = await request.get('/users');
    } catch(error) {
        return errors(error, 'admin/user/list.js : line 20');
    }
    const users = data.data;
    for(i = 0; i < users.length; i++) {
        array[i+1] = [

            users[i].attributes.id,

            (users[i].attributes.last_name) ? 
                `${users[i].attributes.first_name} ${users[i].attributes.last_name}` : 
                users[i].attributes.first_name,
                
            (users[i].attributes.root_admin) ? "Admin" : "User"
        ]
    }
    obj.desc = '```json\n'+table(array, { align: [ 'r', 'c', 'l' ], hsep: [ '     ' ] })+'```';
    return obj;

}