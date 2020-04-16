
const request = require(`${process.env.root}/src/admin/request`);
const config = require(`${process.env.root}/config`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);
const _ = require('underscore');
const table = require('text-table');

module.exports = async function(args) {

    let obj = {
        title: {
            text: `Location Editor | Location #${args[2]}`,
            icon: config.embeds.servers.icon
        },
        color: config.embeds.servers.color,
        desc: "",
        footer: {
            text: config.embeds.footer.text,
            icon: config.embeds.footer.icon
        }
    };

    let baseParams;
    
    try {

        data = await request.get(`/locations/${args[2]}`);
        baseParams = data.attributes; // Assign current data to newParams object.

    } catch(error) {
        return errors(error, 'admin/location/edit.js : line 27');

    }

    const params = await util.parseRawParams(
            _.compact(

            util.parseParamsWithQuotes(
                args.slice(3).join(" "))

        ), baseParams);

    try {
        // Send the new configuration to wisp, get a result that has changed properties.
        const data = await request.patch(`/locations/${args[2]}`, params);


        const array = util.arrayBooleansToStrings(

            [[`Property`, `Value`]].concat(
                Object.entries(data.data.attributes)
            )

        );

        obj.desc = `Sent data to panel.\n\`\`\`${table(array, { align: [ 'r', 'l'], hsep: [ '   ' ] })}\`\`\``;
        
        return obj;

    } catch(error) {
        return errors(error, 'admin/location/edit.js : line 45');

    }
}