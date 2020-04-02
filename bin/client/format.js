const table = require('text-table');
exports.ServerStatus = async function(response) {
    const data = response.data.attributes;
    let obj = {};
    let array = [];
    
    if(data.state == "on") {
        obj.color = 53611;
        obj.name = data.query.name;

        let maxplayers = data.query.maxplayers || "??";
        
        // The server is running, lets put resource usage in a table.
        array = [   
            ["Status", data.state.toUpperCase()],
            ["Memory", data.memory.current+'/'+data.memory.limit],
            ["CPU", Math.floor(data.cpu.current)+'/'+data.cpu.limit],
            ["Disk", data.disk.current+'/'+data.disk.limit],
            ["Players", data.players.current+'/'+maxplayers]
        ];
        obj.desc = '```'+table(array, { align: [ 'r', 'l' ], hsep: [ '   ' ] })+'```';

    } else if(data.state == "starting") {
        obj.color = 16098851;
        obj.name = "Server starting";

    } else {
        obj.color = 13632027;
        obj.name = "Server offline";
    }
    //console.log(obj)
    return obj;
}
exports.PlayerList = async function(response) {
    const data = response.data.attributes;
    let obj = {color: 13632027}

    if(data.state == "off") {
        obj.name = "Server offline";

    } else if(data.state == "starting") {
        obj.color = 16098851;
        obj.name = "Server starting";

    } else if(!Object.keys(data.query).length) {
        obj.name = "Server can't be queried."; // Sadly I can't do anything about this :pepecry:
        obj.desc = "This game/voice server type doesn't support queries.";

    } else {
        // If the server was up to be queried, and the gameserver supports it, we do this.
        obj.name = data.query.name;
        var array = [['Name', 'Score', 'Time']];
        var players = data.query.players.concat(data.query.bots);
        obj.color = 53611;

        for (var i = 0; i < players.length; i++) {
            // Each player is stored as an array inside of array array[playerindex]
            array[i+1] = [  players[i].name, 
                            players[i].score, 
                            util.Time(players[i].time)
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
    var string = "";
    var array = Object.entries(data);

    for (var i = 0; i < array.length; i++) {
        string += array[i][0]+"\n"; // This does the trick

    }

    if(string == "") { // In-case you forgot to configure any servers.
        string == "There hasn't been any servers configured";

    }

    let obj = {
        name: "Server List",
        color:  16751104,
        desc:  "This is a list of all configured servers\n```\n"+string+"```"
    }
    return obj;
}

exports.ClientHelp = async function(data ) {
    return {
        name: "Help Menu",
        color: 16751104,
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