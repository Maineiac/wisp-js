const request = require('../../../request');
const config = require('../../../../../config');
const errors = require('../../../error');
const _ = require('underscore');
const table = require('text-table');
module.exports = async function(args) {

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

    let raw_params = args.slice(4);
    raw_params = raw_params.join(" ");
    raw_params = raw_params.match(/[^\s"']+|"([^"]*)"/gmi);

    for(i = 0; i < raw_params.length; i++){

        if(raw_params[i] != null && 
            raw_params[i+1] != null && 
            raw_params[i].charAt(raw_params[i].length - 1) == "=") {

            //Move strings wrapped in "" to the correct key
            if(raw_params[i+1].startsWith('"') || raw_params[i+1].startsWith("'")) {
                raw_params[i] = `${raw_params[i]}${raw_params[i+1]}`; // Looking for better ways to do this
                raw_params[i+1] = null; // After a bunch of checks, this magic reformats our array
            
            }

        }

    }
    let newParams = {};
    let params = _.compact(raw_params);

    for(const p of params) {

        let arr = p.split("=");
        let value = arr[1].replace(/"/g, '');
        value = value.replace(/'/g, '');
        newParams[arr[0]] =  value;

    }

    if(newParams.ports) {
        newParams.ports = newParams.ports.split(`,`);
    }

    const array = [[`Property`, `Value`]];
    const finalarray = array.concat(Object.entries(_.pick(newParams, Boolean)));

    obj.desc = `Created allocation(s).\n
    \`\`\`${table(finalarray, { align: [ 'r', 'l'], hsep: [ '   ' ] })}\`\`\``;

    try {
        await request.post(`/nodes/${args[3]}/allocations`, newParams);
        return obj;

    } catch(error) {
        return errors(error, 'admin/node/allocation/create.js : line 50');


    }
}