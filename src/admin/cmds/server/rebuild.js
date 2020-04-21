
const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);

module.exports = async function(args) {

    const ids = args[2].split(`,`);
    let obj = util.baseEmbedObj(args);

    for(const id of ids) {

        try {
            await request.post(`/servers/${id}/rebuild`);
            obj.desc = `${obj.desc}\nRebuilding server #${id}`;

        } catch(error) {
            return errors(error, 'admin/server/rebuild.js : line 17');

        }
    }
    
    return obj;
}