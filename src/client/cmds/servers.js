const table = require('text-table');
const _ = require('underscore');

const aliases = require(`${process.env.root}/config/aliases`);
const client_embeds = require(`${process.env.root}/config/embeds/client`);
const shared_embeds = require(`${process.env.root}/config/embeds/shared`);
const request = require(`${process.env.root}/src/client/request`);
const errors = require(`${process.env.root}/src/client/error`);

module.exports = async function() {
    let obj = {
        title: {
            text: client_embeds.servers.title,
            icon: client_embeds.servers.icon
        },
        desc: "There hasn't been any servers configured",
        color: client_embeds.servers.color,
        footer: {
            text: shared_embeds.footer.text,
            icon: shared_embeds.footer.icon
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
        (client_embeds.servers.list.alias) ? 'Alias' : false, 
        (client_embeds.servers.list.name) ? 'Name' : false, 
        (client_embeds.servers.list.ip) ? 'IP' : false, 
        (client_embeds.servers.list.state) ? 'State' : false
    ]
    let array = [ _.compact(tableheader) ];
    let v = 0;
    let k = 0;
    for (const s of servers) {
        v++;
        let ip, port, state;
        let server = s.attributes;

        const alias = (_.invert(aliases))[server.identifier];
        if(client_embeds.servers.list.state) {
            try {
                const stats = await request.get(`/servers/${server.identifier}/utilization`);
                state = stats.attributes.state;
            } catch(error) {

                return errors(error, 'servers.js : line 47');
        
            }
        }
        let allocations = server.relationships.allocations.data;

        for (const a of allocations) {
            if(a.attributes.primary && client_embeds.servers.list.ip) {

                ip = (client_embeds.servers.list.ip=="alias") 
                ? a.attributes.alias 
                : a.attributes.ip;

                port = (client_embeds.servers.list.port) 
                ? ":" + a.attributes.port 
                : "";

            } else {
            }
        }

        if(alias) {

            temparray = [ 

                (client_embeds.servers.list.alias) ? alias : false, 
                (client_embeds.servers.list.name) ? server.name : false, 
                (client_embeds.servers.list.ip) ? ip + port : false, 
                (client_embeds.servers.list.state) ? state.toUpperCase() : false
            ];

            array[v-k] = _.compact(temparray);

        } else {
            k++;
        }

    }
    if(_.isArray(array[1])) { // In-case you forgot to configure any servers.
    
        let align =  _.compact([ 
            (client_embeds.servers.list.alias) ? 'c' : false, 
            (client_embeds.servers.list.name) ? 'c' : false, 
            (client_embeds.servers.list.ip) ? 'c' : false, 
            (client_embeds.servers.list.state) ? 'c' : false
        ]);

        obj.desc = '```'+table(array, { align , hsep: [ '  ' ] })+'```'

    }
    
    return obj;

    /**/

}