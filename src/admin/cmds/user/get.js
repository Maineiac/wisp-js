const request = require('../../request');
const config = require('../../../../config');
const errors = require('../../error');
const util = require('../../../util.js');
const _ = require('underscore');
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
        console.log(data)
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