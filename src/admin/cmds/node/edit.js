const request = require('../../request');
const config = require('../../../../config');
const errors = require('../../error')
const _ = require('underscore');
const table = require('text-table');
module.exports = async function(args) {
    let obj = {
        title: {
            text: "Node Editor",
            icon: config.embeds.servers.icon
        },
        color: config.embeds.servers.color,
        desc: "",
        footer: {
            text: config.embeds.footer.text,
            icon: config.embeds.footer.icon
        }
    };

    let raw_params = args.slice(3);
    raw_params = raw_params.join(" ");
    raw_params = raw_params.match(/[^\s"']+|"([^"]*)"/gmi);
    for(i = 0; i < raw_params.length; i++){
        if(raw_params[i] != null && raw_params[i+1] != null && raw_params[i].charAt(raw_params[i].length - 1) == "="){
            if(raw_params[i+1].startsWith('"') || raw_params[i+1].startsWith("'")) {
                raw_params[i] = `${raw_params[i]}${raw_params[i+1]}`;
                raw_params[i+1] = null;
            }
        }
    }

    let getConfig;
    try {
        getConfig = await request.get(`/nodes/${args[2]}`);
    } catch(error) {
        return errors(error, 'edit.js : line 34');
    }

    let params = _.compact(raw_params);
    let curParams = getConfig.attributes;
    for(const p of params) {
        let arr = p.split("=");

        let value = arr[1].replace(/"/g, '');
        value = value.replace(/'/g, '');
        curParams[arr[0]] =  value;
    }

    try {
        const data = await request.patch(`/nodes/${args[2]}`, curParams);

        curParams.license_key = `OMITTED`;
        curParams.fqdn = `OMITTED`;

        let array = [[`Property`, `Value`]];
        let nonull = _.pick(curParams, Boolean); 
        let params = Object.entries(nonull);
        let final = array.concat(params)

        obj.desc = `Sent data to panel.\n\`\`\`${table(final, { align: [ 'r', 'l'], hsep: [ '   ' ] })}\`\`\``;
        return obj;
    } catch(error) {
        return errors(error, 'edit.js : line 51');
    }
}