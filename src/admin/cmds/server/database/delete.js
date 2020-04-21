
const request = require(`${process.env.root}/src/admin/request`);
const config = require(`${process.env.root}/config`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);
const _ = require('underscore');
const table = require('text-table');

module.exports = async function(args) {
    let obj = util.baseEmbedObj('servers', "Database Editor");
    const sid = args[3];
    const ids = args[4].split(`,`);

    for(const id of ids) {

        try {
            await request.delete(`/servers/${sid}/databases/${id}`);
            obj.desc = `${obj.desc}\nDeleted Database #${id}`;
            //obj.desc = "Disabled until permissions are setup";

        } catch(error) {
            return errors(error, 'admin/server/database/delete.js : line 17');

        }
    }
    
    return obj;
}