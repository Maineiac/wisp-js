
const request = require('../../request');
const config = require('../../../../config');
const errors = require('../../error');
const util = require('../../../util.js');
const _ = require('underscore');
const table = require('text-table');

const getServer = require('./get/all')
module.exports = async function(args) {

    let obj = {
        title: {
            text: `Server Creator`,
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
        
        const data = await request.post(`/servers`, params);
        return getServer([`server`, `get`, `all`, data.data.attributes.id]);

        /*const array = util.cleanArray(

            [[`Property`, `Value`]].concat(
                Object.entries(data.data.attributes)
            )

        );

        obj.desc = `Sent data to panel.\n\`\`\`${table(array, { align: [ 'r', 'l'], hsep: [ '   ' ] })}\`\`\``;
        
        return obj;*/

    } catch(error) {
        return errors(error, 'admin/server/create.js : line 33');

    }
}