
const request = require(`${process.env.root}/src/admin/request`);
const config = require(`${process.env.root}/config`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);
const _ = require('underscore');
const table = require('text-table');

module.exports = async function(args) {
    let obj = util.baseEmbedObj('servers', "Server Editor");

    const ids = args[2].split(`,`);

    for(const id of ids) {

        try {
            await request.post(`/servers/${id}/suspend`);
            obj.desc = `${obj.desc}\nSuspended server #${id}`;

        } catch(error) {
            return errors(error, 'admin/server/suspend.js : line 17');

        }
    }
    
    return obj;
}