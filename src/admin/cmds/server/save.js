const request = require(`${process.env.root}/src/admin/request`);
const config = require(`${process.env.root}/config`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);
const fs = require('fs');
const _ = require('underscore');
const table = require('text-table');
module.exports = async function(args) {
    let id = args[2];
    let obj = {
        title: {
            text: "Save Server",
            icon: config.embeds.servers.icon
        },
        color: config.embeds.servers.color,
        footer: {
            text: config.embeds.footer.text,
            icon: config.embeds.footer.icon
        }
    };
    if(isNaN(args[2])) {
        const servers = await request.getRecursive(`/servers`);
        for(const s of servers) {
            if(args[2] == s.attributes.identifier) {
                id = s.attributes.id;
            }
        }
    }
    try {
        const data = await request.get(`/servers/${id}`);

        const template = {
            name: data.attributes.name,
            user: data.attributes.user,
            description: data.attributes.description,
            egg: data.attributes.egg,
            pack: data.attributes.pack,
            docker_image: data.attributes.container.image,
            startup: data.attributes.container.startup_command,
            limits: {
                memory: data.attributes.limits.memory,
                swap: data.attributes.limits.swap,
                disk: data.attributes.limits.disk,
                io: data.attributes.limits.io,
                cpu: data.attributes.limits.cpu
            },
            feature_limits: {
                databases: data.attributes.feature_limits.databases,
                allocations: data.attributes.feature_limits.allocations
            },
            environment: data.attributes.container.environment
        }
        const ws = await fs.createWriteStream(`${process.env.root}/data/server_templates/${args[3]}.json`);
        ws.write(JSON.stringify(template));
        ws.end();
        obj.desc = `Created template at \`data/server_templates/${args[3]}.json\`\n\nIt contains the following object :\n\n\`\`\`${JSON.stringify(template)}\`\`\``;
        return obj;
    } catch(error) {
        return errors(error, 'admin/user/get.js : line 51');
    }
}