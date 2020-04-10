const request = require('../../request');
const config = require('../../../../config');
const table = require('text-table');
module.exports = async function() {
    let obj = {
        title: {
            text: "Node List",
            icon: config.embeds.servers.icon
        },
        color: config.embeds.servers.color,
        footer: {
            text: config.embeds.footer.text,
            icon: config.embeds.footer.icon
        }
    };
    let array = [["ID", "Name", "Location"]];
    const data = await request.get('/nodes');
    const nodes = data.data;
    //console.log(nodes);
    for(i = 0; i < nodes.length; i++) {
        console.log(nodes[i]);
        array[i+1] = [

            nodes[i].attributes.id,
            nodes[i].attributes.name,
            nodes[i].attributes.location_id
        ]
    }
    console.log(array);
    obj.desc = '```'+table(array, { align: [ 'c', 'c', 'c' ], hsep: [ '   ' ] })+'```';
    //console.log(data.data);
    return obj;
}