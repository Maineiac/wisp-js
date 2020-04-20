
const request = require('../../request');
const config = require('../../../../config');
const errors = require('../../error');
const util = require('../../../util.js');
const fs = require('fs');
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
    let template
    let userparams
    let slice = 2;
    if(!args[2].includes('=')) { 
        template = JSON.parse(fs.readFileSync(`${process.env.root}/data/server_templates/${args[2]}.json`, 'utf8'));
        slice = 3;
    }

    if(args[slice]) {
        userparams = await util.parseRawParams(

                _.compact(
                util.parseParamsWithQuotes(
                    args.slice(slice).join(" "))
            )
        );
    }

    const params = {...template, ...userparams}
    console.log(params);

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