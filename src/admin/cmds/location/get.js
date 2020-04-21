const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);

const table = require('text-table');

module.exports = async function(args) {

    let obj = util.baseEmbedObj(args); 

    try {
        const data = await request.get(`/locations/${args[2]}`);
        const created = new Date(data.attributes.created_at).toDateString();
        const array = [
            [`ID`, data.attributes.id],
            [`Short Name`, data.attributes.short],
            [`Long Name`, data.attributes.long],
            [`Created`, created]
            
        ]
        obj.desc = `\`\`\`${table(array, { align: [ 'r', 'l'], hsep: [ '   ' ] })}\`\`\``;
        return obj;
    } catch(error) {
        return errors(error, 'admin/location/get.js : line 20');
    }
}