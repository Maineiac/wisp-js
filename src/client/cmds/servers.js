const table = require('text-table');
const _ = require('underscore');

const config = require('../../../config');
const request = require('../request');
const errors = require('../error');

module.exports = async function() {
    let obj = {
        title: {
            text: config.embeds.servers.title,
            icon: config.embeds.servers.icon
        },
        desc: "There hasn't been any servers configured",
        color: config.embeds.servers.color,
        footer: {
            text: config.embeds.footer.text,
            icon: config.embeds.footer.icon
        }
    };

    let data, servers;
    try {
        data = await request.get('?include=allocations')
        servers = data.data;
    } catch(error) {

        return errors(error, 'servers.js : line 23');

    }
    let tableheader = [
        (config.embeds.servers.list.alias) ? 'Alias' : false, 
        (config.embeds.servers.list.name) ? 'Name' : false, 
        (config.embeds.servers.list.ip) ? 'IP' : false, 
        (config.embeds.servers.list.state) ? 'State' : false
    ]
    let array = [ _.compact(tableheader) ];
    let v = 0;
    let k = 0;
    for (const s of servers) {
        v++;
        let ip, port, state;
        let server = s.attributes;

        const alias = (_.invert(config.servers))[server.identifier];
        if(config.embeds.servers.list.state) {
            try {
                const stats = await request.get(`/servers/${server.identifier}/utilization`);
                state = stats.attributes.state;
            } catch(error) {

                return errors(error, 'servers.js : line 47');
        
            }
        }
        let allocations = server.relationships.allocations.data;

        for (const a of allocations) {
            if(a.attributes.primary && config.embeds.servers.list.ip) {

                ip = (config.embeds.servers.list.ip=="alias") 
                ? a.attributes.alias 
                : a.attributes.ip;

                port = (config.embeds.servers.list.port) 
                ? ":" + a.attributes.port 
                : "";

            } else {
            }
        }

        if(alias) {

            temparray = [ 

                (config.embeds.servers.list.alias) ? alias : false, 
                (config.embeds.servers.list.name) ? server.name : false, 
                (config.embeds.servers.list.ip) ? ip + port : false, 
                (config.embeds.servers.list.state) ? state.toUpperCase() : false
            ];

            array[v-k] = _.compact(temparray);

        } else {
            k++;
        }

    }
    if(_.isArray(array[1])) { // In-case you forgot to configure any servers.
    
        let align =  _.compact([ 
            (config.embeds.servers.list.alias) ? 'c' : false, 
            (config.embeds.servers.list.name) ? 'c' : false, 
            (config.embeds.servers.list.ip) ? 'c' : false, 
            (config.embeds.servers.list.state) ? 'c' : false
        ]);

        obj.desc = '```'+table(array, { align , hsep: [ '  ' ] })+'```'

    }
    
    return obj;

    /**/

}