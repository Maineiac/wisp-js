const request = require('../../request');
const config = require('../../../../config');
const table = require('text-table');
module.exports = async function(args) {
    let obj = {
        title: {
            text: "User Lookup",
            icon: config.embeds.servers.icon
        },
        color: config.embeds.servers.color,
        footer: {
            text: config.embeds.footer.text,
            icon: config.embeds.footer.icon
        }
    };
    try {
        const data = await request.get(`/users/${args[2]}`);
        console.log(data);
        const created = new Date(data.attributes.created_at).toDateString();
        const array = [
            [`Name:`, data.attributes.name],
            [`Node ID:`, data.attributes.id],
            [`Location ID:`, data.attributes.location_id],
            [`Memory:`, data.attributes.memory],
            [`Disk:`, data.attributes.disk],
            [`CPU:`, data.attributes.cpu],
            [`Created:`, created]
            
        ]
        obj.desc = `${data.attributes.description}\`\`\`${table(array, { align: [ 'r', 'l'], hsep: [ '   ' ] })}\`\`\``;
        return obj;
    } catch(error) {
        return errors(error, 'admin/user/get.js : line 51');
    }
}