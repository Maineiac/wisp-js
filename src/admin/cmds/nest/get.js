const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);

const table = require('text-table');

module.exports = async function(args) {

    let obj = util.baseEmbedObj(args);

    try {
        const data = await request.get(`/nests/${args[2]}`);
        const created = new Date(data.attributes.created_at).toDateString();
        const array = [
            [`ID`, data.attributes.id],
            [`Name`, data.attributes.name],
            [`Author`, data.attributes.author],
            [`Created`, created],
            [`UUID`, data.attributes.uuid]
            
        ]
        obj.desc = `${data.attributes.description}
        \`\`\`${table(array, { align: [ 'r', 'l'], hsep: [ '   ' ] })}\`\`\``;
        return obj;
    } catch(error) {
        return errors(error, 'admin/nests/get.js : line 20');
    }
}