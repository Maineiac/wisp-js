const request = require('../../request');
const config = require('../../../../config');
const errors = require('../../error')
const _ = require('underscore');
const table = require('text-table');
module.exports = async function(args) {
    let obj = {
        title: {
            text: `Node Editor | Node #${args[2]}`,
            icon: config.embeds.servers.icon
        },
        color: config.embeds.servers.color,
        desc: "",
        footer: {
            text: config.embeds.footer.text,
            icon: config.embeds.footer.icon
        }
    };

    // This chunk will format the string and work with any strings (parameters wrapped in quotes)
    // It allows the user to use spaces in parameters if the wrap the value in quotes
    let raw_params = args.slice(3);
    raw_params = raw_params.join(" ");
    raw_params = raw_params.match(/[^\s"']+|"([^"]*)"/gmi);
    for(i = 0; i < raw_params.length; i++){
        if(raw_params[i] != null && raw_params[i+1] != null && raw_params[i].charAt(raw_params[i].length - 1) == "="){
            if(raw_params[i+1].startsWith('"') || raw_params[i+1].startsWith("'")) {
                raw_params[i] = `${raw_params[i]}${raw_params[i+1]}`; // Looking for better ways to do this
                raw_params[i+1] = null; // After a bunch of checks, this magic reformats our array
            }
        }
    }

    let params = _.compact(raw_params); // Removes any keys that we gave a null value
    
    // Next we'll grab the current configuration of the node, then overwrite them with
    // any new parameters that are in raw_params
    let newParams;
    try {

        data = await request.get(`/nodes/${args[2]}`);
        newParams = data.attributes; // Assign current data to newParams object.

    } catch(error) {
        return errors(error, 'admin/node/edit.js : line 34');

    }

    for(const p of params) {
        // We split our paramerters into [property, value],
        // remove any quotes, and assign it the value based
        // on existing properties in newParams.
        // nonexistent/misspelled parameters aren't caught
        // they're simply ignored.
        let arr = p.split("=");
        let value = arr[1].replace(/"/g, '');
        value = value.replace(/'/g, '');
        newParams[arr[0]] =  value;
    }

    try {
        // Send the new configuration to wisp, get a result that has changed properties.
        const data = await request.patch(`/nodes/${args[2]}`, newParams);
        
        // Omit sensitive data
        data.data.attributes.license_key = `OMITTED`;
        data.data.attributes.fqdn = `OMITTED`;


        const array = [[`Property`, `Value`]];
        const finalarray = array.concat(Object.entries(_.pick(data.data.attributes, Boolean)));

        obj.desc = `Sent data to panel.\n\`\`\`${table(finalarray, { align: [ 'r', 'l'], hsep: [ '   ' ] })}\`\`\``;
        return obj;

    } catch(error) {
        return errors(error, 'admin/node/edit.js : line 51');
    }
}