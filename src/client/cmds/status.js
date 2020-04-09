const config = require('../../../config');
const request = require('../request');
const errors = require('../error');

const table = require('text-table');
const _ = require('underscore');

module.exports = async function(args) {
    let data, response;
    let obj = {
        title: {
            text: config.embeds.status.title,
            icon: config.embeds.status.icon
        },
        color: config.embeds.error.color,
        footer: {
            text: config.embeds.footer.text,
            icon: config.embeds.footer.icon
        }
    };
    try {
        response = await request.get(`/servers/${config.servers[args[0]]}/utilization`);
        data = response.attributes;

    } catch(error) {

        return errors(error, 'status.js : line 20');

    }
    let array = [];
    if(data.state == "on") {
        obj.color = config.embeds.status.color.running;
        obj.head = data.query.name;
        console.log(data);
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
            if(config.debug) { console.log(data); }
        }
        obj.desc = '```'+table(array, { align: [ 'r', 'l' ], hsep: [ '   ' ] })+'```';

    } else if(data.state == "starting") {
        obj.color = config.embeds.status.color.starting;
        obj.name = "Server starting";

    } else {
        obj.color = config.embeds.status.color.stopped;
        obj.name = "Server offline";
    }
    return obj;
}