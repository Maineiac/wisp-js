const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util`);

module.exports = async function(args) {

    const ids = args[2].split(`,`);
    let obj = util.baseEmbedObj(args);

    for(const id of ids) {

        try {
            await request.delete(`/locations/${id}`);
            obj.desc = `${obj.desc}\nDeleted location #${id}`;

        } catch(error) {
            return errors(error, 'admin/location/delete.js : line 17');

        }
    }
    
    return obj;
}