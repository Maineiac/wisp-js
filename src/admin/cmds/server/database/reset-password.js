const request = require(`${process.env.root}/src/admin/request`);
const config = require(`${process.env.root}/config`);
const errors = require(`${process.env.root}/src/admin/error`);
const util = require(`${process.env.root}/src/util.js`);
const fs = require('fs');
const _ = require('underscore');
const table = require('text-table');
module.exports = async function(args) {

    let obj = {
        title: {
            text: `Database Editor | DB ${args[4]} Server ${args[3]}`,
            icon: config.embeds.servers.icon
        },
        color: config.embeds.servers.color,
        desc: "",
        footer: {
            text: config.embeds.footer.text,
            icon: config.embeds.footer.icon
        }
    };

    try {
        
        const data = await request.post(`/servers/${args[3]}/databases/${args[4]}/reset-password`);

        console.log(data);

        //obj.desc = `Sent data to panel.\n\`\`\`${table(array, { align: [ 'r', 'l'], hsep: [ '   ' ] })}\`\`\``;
        obj.desc = `Password reset successful.`; 

        return obj;

    } catch(error) {
        return errors(error, 'admin/server/database/reset-password.js : line 25');

    }
}