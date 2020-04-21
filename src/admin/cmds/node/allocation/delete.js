const request = require(`${process.env.root}/src/admin/request`);
const config = require(`${process.env.root}/config`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);
const _ = require('underscore');
const table = require('text-table');

module.exports = async function(args) {

    let obj = {
        title: {
            text: `Allocation Editor | Node #${args[3]}`,
            icon: config.embeds.servers.icon
        },
        color: config.embeds.servers.color,
        desc: "",
        footer: {
            text: config.embeds.footer.text,
            icon: config.embeds.footer.icon
        }
    };

    const ids = args[4].split(`,`);

    for(const id of ids) {

        try {
            await request.delete(`/nodes/${args[3]}/allocations/${id}`);
            obj.desc = `${obj.desc}\nDeleted allocation #${id}`;

        } catch(error) {
            return errors(error, 'admin/node/allocation/delete.js : line 22');

        }
    }
    
    return obj;
}