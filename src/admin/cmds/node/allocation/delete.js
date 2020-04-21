const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);

module.exports = async function(args) {

    const ids = args[4].split(`,`);
    let obj = util.baseEmbedObj(args);

    for(const id of ids) {

        try {
            await request.delete(`/nodes/${args[3]}/allocations/${id}`);
            obj.desc = `${obj.desc}\nDeleted allocation #${id}`;

        } catch(error) {
            return errors(error, 'admin/node/allocation/delete.js : line 22');

        }
    }
    
    return obj;
}