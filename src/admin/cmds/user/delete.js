const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);

module.exports = async function(args) {

    const ids = args[2].split(`,`);
    let obj = util.baseEmbedObj(args);

    for(const id of ids) {

        try {
            //await request.delete(`/users/${id}`);
            //obj.desc = `${obj.desc}\nDeleted user #${id}`;
            obj.desc = "Disabled until permissions are setup";

        } catch(error) {
            return errors(error, 'admin/user/delete.js : line 25');

        }
    }
    
    return obj;
}