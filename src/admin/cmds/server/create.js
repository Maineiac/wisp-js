
const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);

const fs = require('fs');
const _ = require('underscore');

const getServer = require('./get/all')

module.exports = async function(args) {

    let template
    let userparams
    let slice = 2;
    
    if(!args[2].includes('=')) { 
        try {
            template = JSON.parse(fs.readFileSync(`${process.env.root}/data/server_templates/${args[2]}.json`, 'utf8'));
        } catch(error) {
            return errors(error, `data/server_templates/${args[2]}.json`);
        }
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
        return getServer([`server`, `get`, data.data.attributes.id]);

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