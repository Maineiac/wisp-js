
const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const settings = require(`${process.env.root}/config/settings`);
const util = require(`${process.env.root}/src/util`);

const fs = require('fs');
const _ = require('underscore');

const getServer = require('./get/all')

module.exports = async function(args) {

    if(args[2] == "help") {
        const p = settings.prefix;
        let obj = util.baseEmbedObj(["shared", "help"]);
        obj.title.text = `${obj.title.text} | Server Creator`;
        obj.desc = `
**Key** :
\`() = required\`
\`[] = optional\`\n
\`\`\`dsconfig\n${p}server create [template] (parameters)\`\`\`\nYou can create a server template using the above \`!server save\` command, load it with this command, and modify it before the bot sends it to the panel.\n\nIf you do this, the only required paramter is : *allocation.default*\nExample : \`!server create template allocation.default=309\`\n\nOtherwise...\n\nRequired Parameters : *name*, *user*, *egg*, *docker_image*, *startup*, *environment*, *limits.memory*, *limits.swap*, *limits.disk*, *limits.io*, *limits.cpu*, *feature_limits.databases*, *feature_limits.allocations*, *allocation.default*\n
Example Bungeecord server : \n\`!server create name="A Bungeecord Server" user=3 egg=3 docker_image=quay.io/pterodactyl/core:java startup="java -Xms128M -Xmx{{SERVER_MEMORY}}M -jar {{SERVER_JARFILE}}" environment.SERVER_JARFILE=bungeeord.jar environment.BUNGEE_VERSION=latest limits.memory=0 limits.cpu=0 limits.swap=0 limits.disk=0 limits.io=500 feature_limits.databases=0 feature_limits.allocations=0 allocation.default=375\`\nHmmm, maybe I should grab info from the egg instead? Added to planned list.
`
        return obj;
    }

    let template
    let userparams
    let slice = 2;
    
    if(args[2] && !args[2].includes('=')) { 
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