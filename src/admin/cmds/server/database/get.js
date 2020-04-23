const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);

const table = require('text-table');
module.exports = async function(args) {
    
    let id = args[3];
    let obj = util.baseEmbedObj(args);

    if(isNaN(args[3])) {
        const servers = await request.getRecursive(`/servers`);
        for(const s of servers) {
            if(args[3] == s.attributes.identifier) {
                id = s.attributes.id;
            }
        }
    }
    try {
        const data = await request.get(`/servers/${id}/databases/${args[4]}`);
        const created = new Date(data.attributes.created_at).toDateString();

        const array = [
            [`ID`, data.attributes.id],
            [`Server`, data.attributes.server],
            [`Host`, data.attributes.host],
            [`User`, data.attributes.username],
            [`Name`, data.attributes.database],
            [`Remote`, data.attributes.remote],
            [`Created`, created]
        ]
        
        obj.desc = `\`\`\`${table(util.cleanArray(array), { align: [ 'r', 'l'], hsep: [ '   ' ] })}\`\`\``;
        return obj;
    } catch(error) {
        return errors(error, 'admin/database/get.js : line 30');
    }
}