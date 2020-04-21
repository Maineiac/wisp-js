const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);

const _ = require('underscore');
const table = require('text-table');
module.exports = async function(args) {

    let obj = util.baseEmbedObj(args);
    let baseParams;
    
    try {

        data = await request.get(`/servers/${args[3]}`);
        baseParams = data.attributes; // Assign current data to newParams object.
        baseParams.image = data.attributes.container.image;
        baseParams.skip_scripts = false;
        baseParams.startup = data.attributes.container.startup_command;
        baseParams.environment = data.attributes.container.environment;

    } catch(error) {
        return errors(error, 'admin/server/edit/details.js : line 26');

    }

    const params = await util.parseRawParams(
            _.compact(

            util.parseParamsWithQuotes(
                args.slice(4).join(" "))

        ), baseParams);

    try {
        // Send the new configuration to wisp, get a result that has changed properties.
        const data = await request.patch(`/servers/${args[3]}/startup`, params);


        const array = util.cleanArray(

            [[`Property`, `Value`]].concat(
                Object.entries(data.data.attributes)
            )

        );

        obj.desc = `Sent data to panel.\n\`\`\`${table(array, { align: [ 'r', 'l'], hsep: [ '   ' ] })}\`\`\``;
        
        return obj;

    } catch(error) {
        return errors(error, 'admin/server/edit/details.js : line 44');

    }
}