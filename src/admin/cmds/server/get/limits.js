const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);

const _ = require('underscore');
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
        const data = await request.get(`/servers/${id}`);
        const created = new Date(data.attributes.created_at).toDateString();
        const limits = [
            [`     Memory`, data.attributes.limits.memory],
            [`Swap`, data.attributes.limits.swap],
            [`Disk`, data.attributes.limits.disk],
            [`IO`, data.attributes.limits.io],
            [`CPU`, data.attributes.limits.cpu]
        ];

        const feature_limits = [
            [`Databases`, data.attributes.feature_limits.databases],
            [`Allocations`, data.attributes.feature_limits.allocations]
        ]
            
        obj.desc = `**#${data.attributes.id}** | \`${data.attributes.identifier}\`\n\`\`\`\nHardware\n${table(limits, { align: [ 'r', 'l'], hsep: [ '   ' ] })}\n\nFeatures\n${table(feature_limits, { align: [ 'r', 'l'], hsep: [ '   ' ] })}\`\`\``;
        return obj;
    } catch(error) {
        return errors(error, 'admin/user/get.js : line 51');
    }
}