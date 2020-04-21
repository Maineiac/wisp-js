const request = require(`${process.env.root}/src/admin/request`);
const config = require(`${process.env.root}/config`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);
const _ = require('underscore');
const table = require('text-table');

module.exports = async function(args) {
    let obj = util.baseEmbedObj('servers', "Location Editor");

    const ids = args[2].split(`,`);

    for(const id of ids) {

        try {
            await request.delete(`/locations/${id}`);
            obj.desc = `${obj.desc}\nDeleted location #${id}`;
            //obj.desc = "Disabled until permissions are setup";N

        } catch(error) {
            return errors(error, 'admin/location/delete.js : line 17');

        }
    }
    
    return obj;
}