const table = require('text-table');
const config = require('../../config.js');
var _ = require('underscore');
exports.ServerStatus = async function(response) {
    const data = response.data.attributes;
    let obj = {};
    let array = [];
    
    if(data.state == "on") {
        obj.color = config.embeds.status.color.running;
        obj.name = data.query.name;
        
        let curplayers = data.players.current;
        let maxplayers = data.query.maxplayers || "??";
        if (data.query.raw) {curplayers = data.query.raw.numplayers}
        // The server is running, lets put resource usage in a table.
        array = [   
            ["Status", data.state.toUpperCase()],
            ["Memory", data.memory.current+'/'+data.memory.limit],
            ["CPU", Math.floor(data.cpu.current)+'/'+data.cpu.limit],
            ["Disk", data.disk.current+'/'+data.disk.limit],
            ["Players", curplayers+'/'+maxplayers]
        ];
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
    //console.log(obj)
    return obj;
}
function formatTime(seconds) {
    var r,s;
    var time = Math.floor(seconds);
    var timestr = `${time}s`;
    if (time >= 60) {
      r = time%60;
      time = Math.floor(time / 60);
      timestr = `${time}m ${r}s`;
    }
    if (time >= 60) {
      s = r;
      r = time%60;
      time = Math.floor(time / 60);
      timestr = `${time}h ${r}m ${s}s`;
    }
    return timestr;
}
exports.PlayerList = async function(response) {
    const data = response.data.attributes;
    let obj = {color: config.embeds.players.color.stopped}

    if(data.state == "off") {
        obj.name = "Server offline";

    } else if(data.state == "starting") {
        obj.color = config.embeds.players.color.starting;
        obj.name = "Server starting";

    } else if(!Object.keys(data.query).length) {
        if(config.debug) { console.log(data); }
        obj.name = "Server can't be queried."; // Sadly I can't do anything about this :pepecry:
        obj.desc = "This game/voice server type doesn't support queries.";

    } else {
        // If the server was up to be queried, and the gameserver supports it, we do this.
        obj.name = data.query.name;
        var array = [['Name', 'Score', 'Time']];
        var players = data.query.players.concat(data.query.bots);
        obj.color = config.embeds.players.color.running;

        for (var i = 0; i < players.length; i++) {
            // Each player is stored as an array inside of array array[playerindex]
            array[i+1] = [  players[i].name, 
                            players[i].score, 
                            formatTime(players[i].time)
                        ];

        }
        if(!array[1]) { // Playerlist is empty
            obj.desc = "There are no players currently on the server.";

        } else { // Pass our array to the text-table module, returns a "table"
            obj.desc = '```'+table(array, { align: [ 'l', 'c', 'c' ], hsep: [ '    ' ] })+'```';

        }
    }
    return obj;
}
exports.ServerList = async function(data) {
    let obj = {};
    if(config.handle_servers) {
        const instance = require('./request.js');
        const response = await instance.get('?include=allocations');
        const servers = response.data.data;
        let array = [['Alias', 'Name', 'IP', 'State']];
        let v = 0;
        let k = 0;
        for (const s of servers) {
            v++;
            let ip = "";
            let port = 0;
            let server = s.attributes;
            const alias = (_.invert(config.servers))[server.identifier];
            const stats = await instance.get(`servers/${server.identifier}/utilization`);
            let state = stats.data.attributes.state;
            //console.log(alias);
            let allocations = server.relationships.allocations.data;
            for (const a of allocations) {
                if(a.attributes.primary) {
                    ip = a.attributes.ip;
                    port = a.attributes.port;
                }
            }
            if(alias) {
                array[v-k] = [    alias,
                                server.name, 
                                ip+":"+port, 
                                state.toUpperCase()
                            ];
            } else {
                k++;
            }
            console.log(array);

        }
        obj = {
            name: "",
            color:  config.embeds.serverlist.color,
            desc:  '```'+table(array, { align: [ 'c', 'c', 'c', 'c' ], hsep: [ '    ' ] })+'```'
        }
        console.log(obj);
    } else {
        
        var array = Object.entries(config.servers);

        for (var i = 0; i < array.length; i++) {
            string += array[i][0]+"\n"; // This does the trick

        }

        if(string == "") { // In-case you forgot to configure any servers.
            string == "There hasn't been any servers configured";

        }

        obj = {
            name: "Server List",
            color:  config.embeds.serverlist.color,
            desc:  "This is a list of all configured servers\n```\n"+string+"```"
        }
    }
    return obj;
}

exports.ClientHelp = async function(data ) {
    return {
        name: "",
        color: config.embeds.help.color,
        desc: "**Base commands**\n```"+
        data+"help | You're looking at it.\n"+
        data+"servers | Get a list of the available servers.```\n"+
        "**Server commands**\n These are performed with the command being the alias"+
        " for the server it's being addressed to. Here is the format for server commands : \n`"+
        data+"alias [command] <arguments>`\n```"+
        data+"alias [status] | Get the state and usage.\n"+
        data+"alias [players] | Get a list of current players.\n"+
        data+"alias [power] <signal> | Send power signal.\n"+
        data+"alias [cmd] <command> | Send command to console.```"
    }
}