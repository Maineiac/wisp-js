const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);

const table = require('text-table');

module.exports = async function(args) {
    
    let obj = util.baseEmbedObj(args);

    try {
        const data = await request.get(`/nests/${args[3]}/eggs/${args[4]}`);
        const created = new Date(data.attributes.created_at).toDateString();
        const array = [
            [`ID`, data.attributes.id],
            [`Nest`, data.attributes.nest],
            [`Name`, data.attributes.name],
            [`Author`, data.attributes.author],
            [`Created`, created],
            [`Image`, data.attributes.docker_image]
            [`UUID`, data.attributes.uuid]
            
        ]
        obj.desc = `${data.attributes.description}
        \`\`\`${table(util.cleanArray(array), { align: [ 'r', 'l'], hsep: [ '   ' ] })}\`\`\``;
        return obj;
    } catch(error) {
        return errors(error, 'admin/nests/get/egg.js : line 21');
    }
}
