const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);

const _ = require('underscore');
const table = require('text-table');

module.exports = async function(args) {

    let obj = util.baseEmbedObj(args);

    const params = await util.parseRawParams(

            _.compact(
            util.parseParamsWithQuotes(
                args.slice(2).join(" "))
        )
    );

    try {
        
        const data = await request.post(`/users`, params);


        const array = util.cleanArray(

            [[`Property`, `Value`]].concat(
                Object.entries(data.data.attributes)
            )

        );

        obj.desc = `Sent data to panel.\n\`\`\`${table(array, { align: [ 'r', 'l'], hsep: [ '   ' ] })}\`\`\``;
        
        return obj;

    } catch(error) {
        return errors(error, 'admin/user/create.js : line 54');

    }
}