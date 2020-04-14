const request = require('../../../request');
const config = require('../../../../../config');
const errors = require('../../../error');
const util = require('../../../../util.js');

const _ = require('underscore');
const table = require('text-table');
module.exports = async function(args) {

    const array = [[`Parameter`, `Value`]];

    let obj = {
        title: {
            text:`Allocation Editor | Node ${args[3]}`,
            icon: config.embeds.servers.icon
        },
        color: config.embeds.servers.color,
        footer: {
            text: config.embeds.footer.text,
            icon: config.embeds.footer.icon
        }
    };

    const setParams = await util.parseRawParams(
        _.compact(util.parseParamsWithQuotes(args.slice(4).join(" ")))
    );

    const params = array.concat(
        Object.entries(_.pick(setParams, Boolean))
    );

    obj.desc = `Created allocation(s).\n
    \`\`\`${table(params, { align: [ 'r', 'l'], hsep: [ '   ' ] })}\`\`\``;

    try {
        await request.post(`/nodes/${args[3]}/allocations`, setParams);
        return obj;

    } catch(error) {
        return errors(error, 'admin/node/allocation/create.js : line 44');

    }
}