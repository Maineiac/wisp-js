const request = require('../../request');
const config = require('../../../../config');
const errors = require('../../error');

const table = require('text-table');
module.exports = async function() {

    let obj = {
        title: {
            text: "User List",
            icon: config.embeds.servers.icon
        },
        color: config.embeds.servers.color,
        footer: {
            text: config.embeds.footer.text,
            icon: config.embeds.footer.icon
        }
    };
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
    console.log(users[3])
    obj.desc = '```json\n'+table(array, { align: [ 'r', 'c', 'l' ], hsep: [ '     ' ] })+'```';
    return obj;

}