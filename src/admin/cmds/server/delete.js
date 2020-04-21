
const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);

module.exports = async function(args) {

    let obj = util.baseEmbedObj(args);

    const ids = args[2].split(`,`);

    for(const id of ids) {

        try {
            await request.delete(`/servers/${id}`);
            obj.desc = `${obj.desc}\nDeleted server #${id}`;

        } catch(error) {
            return errors(error, 'admin/user/delete.js : line 25');

        }
    }
    
    return obj;
}