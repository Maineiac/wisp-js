const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);

const table = require('text-table');

module.exports = async function(args) {

    let obj = util.baseEmbedObj(args);

    try {
        
        const data = await request.post(`/servers/${args[3]}/databases/${args[4]}/reset-password`);
        obj.desc = `Password reset successful.`; 

        return obj;

    } catch(error) {
        return errors(error, 'admin/server/database/reset-password.js : line 25');

    }
}