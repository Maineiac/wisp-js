const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);

const _ = require('underscore');
const table = require('text-table');

module.exports = async function(args) {

    const array = [[`Parameter`, `Value`]];

    let obj = util.baseEmbedObj(args);

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