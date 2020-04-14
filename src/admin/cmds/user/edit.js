
const request = require('../../request');
const config = require('../../../../config');
const errors = require('../../error');
const util = require('../../../util.js');
const _ = require('underscore');
const table = require('text-table');
module.exports = async function(args) {

    let obj = {
        title: {
            text: `User Editor | User #${args[2]}`,
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

        data = await request.get(`/users/${args[2]}`);
        baseParams = data.attributes; // Assign current data to newParams object.

    } catch(error) {
        return errors(error, 'admin/user/edit.js : line 30');

    }

    const params = await util.parseRawParams(
            _.compact(

            util.parseParamsWithQuotes(
                args.slice(3).join(" "))

        ), baseParams);

    try {
        // Send the new configuration to wisp, get a result that has changed properties.
        const data = await request.patch(`/users/${args[2]}`, params);


        const array = [[`Property`, `Value`]];
        const finalParams = array.concat(
            Object.entries(_.pick(data.data.attributes, Boolean))
        );

        const pAWB = array.concat(Object.entries(data.data.attributes));
        let pAWOB = [];
        for(const p in pAWB) {
            pAWOB[p] = [
                pAWB[p][0],
                (_.isBoolean(pAWB[p][1])) ? pAWB[p][1].toString() : pAWB[p][1]
            ]
        }

        obj.desc = `Sent data to panel.\n\`\`\`${table(pAWOB, { align: [ 'r', 'l'], hsep: [ '   ' ] })}\`\`\``;
        
        return obj;

    } catch(error) {
        return errors(error, 'admin/user/edit.js : line 54');

    }
}