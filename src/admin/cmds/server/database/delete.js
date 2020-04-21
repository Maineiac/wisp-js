
const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);

module.exports = async function(args) {
    
    const sid = args[3];
    const ids = args[4].split(`,`);
    let obj = util.baseEmbedObj(args);

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