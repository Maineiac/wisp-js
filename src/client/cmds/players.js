const config = require('../../../config');
const request = require('../request');

const table = require('text-table');

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

module.exports = async function(args) {
    const response = await request.get(`/servers/${config.servers[args[0]]}/utilization`);
    const data = response.attributes;
    let obj = {
        title: {
            text: config.embeds.status.title,
            icon: config.embeds.status.icon
        },
        footer: {
            text: config.embeds.footer.text,
            icon: config.embeds.footer.icon
        }
    };

    if(data.state == "off") {
        obj.color =  config.embeds.players.color.stopped
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