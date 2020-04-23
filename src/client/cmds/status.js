const settings = require(`${process.env.root}/config/settings`);
const aliases = require(`${process.env.root}/config/aliases`);
const client_embeds = require(`${process.env.root}/config/embeds/client`);
const shared_embeds = require(`${process.env.root}/config/embeds/shared`);
const request = require(`${process.env.root}/src/client/request`);
const errors = require(`${process.env.root}/src/client/error`);

const table = require('text-table');
const _ = require('underscore');

module.exports = async function(args) {
    let data, response;
    let obj = {
        title: {
            text: client_embeds.status.title,
            icon: client_embeds.status.icon
        },
        color: client_embeds.error.color,
        footer: {
            text: shared_embeds.footer.text,
            icon: shared_embeds.footer.icon
        }
    };
    try {
        response = await request.get(`/servers/${aliases[args[0]]}/utilization`);
        data = response.attributes;

    } catch(error) {

        return errors(error, 'status.js : line 20');

    }
    let array = [];
    if(data.state == "on") {
        obj.color = client_embeds.status.color.running;
        obj.head = data.query.name;
        // Check the current/max player count WISP can get (pretty much useless, there for sanity)
        let curplayers = (data.players.current) ? data.players.current : "??";
        let maxplayers = data.query.maxplayers || "??";
        // We need to know that the result contains query.raw, some games wont return a query at all.
        if(data.query.raw) {
            // Check raw. Known to work for : Garry's Mod (Source games?)
            curplayers = (data.query.raw.steamid) ? data.query.raw.numplayers : curplayers;
            // Check deeper into raw, this is minecraft vanilla specific (tested on vanilla 1.15.2)
            curplayers = (data.query.raw.bedrock) ? data.query.raw.bedrock.raw.numplayers : curplayers;
        }

        // The server is running, lets put resource usage in a table.
        array = _.compact([   
            ["Status", data.state.toUpperCase()],
            ["Memory", data.memory.current+'/'+data.memory.limit],
            ["CPU", Math.floor(data.cpu.current)+'/'+data.cpu.limit],
            ["Disk", data.disk.current+'/'+data.disk.limit],
            //If  server is queryable, show player count, otherwise omit.
            (curplayers != "??" && maxplayers != "??") ? ["Players", curplayers+'/'+maxplayers] : null
        ]);
        if(maxplayers == "" || !data.query) {
            if(settings.debug) { console.log(data); } // Will help with testing on object in future
        }
        obj.desc = '```'+table(array, { align: [ 'r', 'l' ], hsep: [ '   ' ] })+'```';

    } else if(data.state == "starting") {
        obj.color = client_embeds.status.color.starting;
        obj.name = "Server starting";

    } else {
        obj.color = client_embeds.status.color.stopped;
        obj.name = "Server offline";
    }
    return obj;
}