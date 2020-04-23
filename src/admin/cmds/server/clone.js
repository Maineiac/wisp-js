const request = require(`${process.env.root}/src/admin/request`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);

const fs = require('fs');

const getServer = require('./get/all');

module.exports = async function(args) {

    let id = args[2];
    let obj = util.baseEmbedObj(args);

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

        const params = {
            name: data.attributes.name,
            user: data.attributes.user,
            description: data.attributes.description,
            egg: data.attributes.egg,
            pack: data.attributes.pack,
            docker_image: data.attributes.container.image,
            startup: data.attributes.container.startup_command,
            limits: data.attributes.limits,
            feature_limits: data.attributes.feature_limits,
            environment: data.attributes.container.environment,
            allocation: {
                default: args[3]
            }
        }

        const data2 = await request.post(`/servers`, params);
        return getServer([`server`, `get`, `all`, data2.data.attributes.id]);

    } catch(error) {
        return errors(error, 'admin/server/clone.js : line 51');
    }
}