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
        const created = new Date(data.attributes.created_at).toDateString();
        const array = [
            [`ID`, data.attributes.id],
            [`First Name`, data.attributes.first_name],
            [`Last Name`, data.attributes.last_name],
            [`E-Mail`, data.attributes.email],
            [`Language`, data.attributes.language],
            [`Admin`, data.attributes.root_admin],
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