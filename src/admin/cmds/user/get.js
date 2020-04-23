const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);
const table = require('text-table');

module.exports = async function(args) {
    
    let obj = util.baseEmbedObj(args);
    
    try {
        const data = await request.get(`/users/${args[2]}`);
        const created = new Date(data.attributes.created_at).toDateString();
        const array = [
            [`ID`, data.attributes.id],
            [`Name`, data.attributes.last_name + ', ' + data.attributes.first_name],
            [`Admin`, data.attributes.root_admin],
            [`E-Mail`, data.attributes.email],
            [`Language`, data.attributes.language],
            [`2FA`, data.attributes['2fa']],
            [`Created`, created],
            [`UUID`, data.attributes.uuid]
            
        ]
        obj.desc = `\`\`\`${table(array, { align: [ 'r', 'l'], hsep: [ '   ' ] })}\`\`\``;
        return obj;
    } catch(error) {
        return errors(error, 'admin/user/get.js : line 51');
    }
}