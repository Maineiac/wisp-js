const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);

const _ = require('underscore');
const table = require('text-table');

module.exports = async function(args) {

    let id = args[3];
    let obj = util.baseEmbedObj(["server", "get", "get"]);

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
        /*if(config.fancyEmbeds) {
            const details = [
                [`ID`, data.attributes.id],
                [`External ID`, data.attributes.external_id],
                [`Identifier`, data.attributes.identifier],
                [`Name`, data.attributes.name],
                [`Suspended`, data.attributes.suspended]
            ];
            const limits = [
                [`Memory`, data.attributes.limits.memory],
                [`Swap`, data.attributes.limits.swap],
                [`Disk`, data.attributes.limits.disk],
                [`IO`, data.attributes.limits.io],
                [`CPU`, data.attributes.limits.cpu]
            ];
            const relationships = [
                [`User`, data.attributes.user],
                [`Node`, data.attributes.node],
                [`Allocation`, data.attributes.allocation],
                [`Nest`, data.attributes.nest],
                [`Egg`, data.attributes.egg]
            ];
            obj.fields = [
                [`Details`, `\`\`\`${table(util.cleanArray(details), { align: [ 'r', 'l'], hsep: [ '   ' ] })}\`\`\``, true],
                [`Limits`, `\`\`\`${table(limits, { align: [ 'r', 'l'], hsep: [ '   ' ] })}\`\`\``, true],
                [`UUID`, `\`\`\`${data.attributes.uuid}\`\`\``, false],
                [`Relationships`, `\`\`\`${table(relationships, { align: [ 'r', 'l'], hsep: [ '   ' ] })}\`\`\``, true],
                [`Created`, `\`\`\`${created}\`\`\``, true],
            ]
                
            obj.desc = `${data.attributes.description}`;
        } else {*/
            const array = [
                [`ID`, data.attributes.id],
                [`External ID`, data.attributes.external_id],
                [`Identifier`, data.attributes.identifier],
                [`Name`, data.attributes.name],
                [`Suspended`, data.attributes.suspended],
                [`Memory`, data.attributes.limits.memory],
                [`Swap`, data.attributes.limits.swap],
                [`Disk`, data.attributes.limits.disk],
                [`IO`, data.attributes.limits.io],
                [`CPU`, data.attributes.limits.cpu],
                [`User`, data.attributes.user],
                [`Node`, data.attributes.node],
                [`Allocation`, data.attributes.allocation],
                [`Nest`, data.attributes.nest],
                [`Egg`, data.attributes.egg],
                [`UUID`, data.attributes.uuid],
                [`Image`, data.attributes.container.image],
                [`Installed`, data.attributes.container.installed]
            ]
            const environment = Object.entries(data.attributes.container.environment);
            obj.fields = [
                [`Startup Command`, `\`\`\`brainfuck\n${data.attributes.container.startup_command}\`\`\``, false],
                [`Variables`, `\`\`\`${table(util.cleanArray(environment), { align: [ 'r', 'l'], hsep: [ '   ' ] })}\`\`\``, false]
            ]
                
            obj.desc = `${data.attributes.description}\`\`\`${table(util.cleanArray(array), { align: [ 'r', 'l'], hsep: [ '   ' ] })}\`\`\``;
        //}
        return obj;
    } catch(error) {
        return errors(error, 'admin/server/get/get.js : line 51');
    }
}