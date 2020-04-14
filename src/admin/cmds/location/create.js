
const request = require('../../request');
const config = require('../../../../config');
const errors = require('../../error');
const util = require('../../../util.js');
const _ = require('underscore');
const table = require('text-table');
module.exports = async function(args) {

    let obj = {
        title: {
            text: `Location Creator`,
            icon: config.embeds.servers.icon
        },
        color: config.embeds.servers.color,
        desc: "",
        footer: {
            text: config.embeds.footer.text,
            icon: config.embeds.footer.icon
        }
    };

    const params = await util.parseRawParams(

            _.compact(
            util.parseParamsWithQuotes(
                args.slice(2).join(" "))
        )
    );

    try {
        
        const data = await request.post(`/locations`, params);


        const array = util.arrayBooleansToStrings(

            [[`Property`, `Value`]].concat(
                Object.entries(data.data.attributes)
            )

        );

        obj.desc = `Sent data to panel.\n\`\`\`${table(array, { align: [ 'r', 'l'], hsep: [ '   ' ] })}\`\`\``;
        
        return obj;

    } catch(error) {
        return errors(error, 'admin/location/create.js : line 33');

    }
}