const settings = require(`${process.env.root}/config/settings`);
const aliases = require(`${process.env.root}/config/aliases`);
const client_embeds = require(`${process.env.root}/config/embeds/client`);
const shared_embeds = require(`${process.env.root}/config/embeds/shared`);
const request = require(`${process.env.root}/src/client/request`);
const errors = require(`${process.env.root}/src/client/error`);

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
    let response, data;
    try {
        response = await request.get(`/servers/${aliases[args[0]]}/utilization`);
        data = response.attributes;
    } catch(error) {

        return errors(error, 'players.js : line 27');

    }
    let obj = {
        title: {
            text: client_embeds.players.title,
            icon: client_embeds.players.icon
        },
        footer: {
            text: shared_embeds.footer.text,
            icon: shared_embeds.footer.icon
        }
    };

    if(data.state == "off") {
        obj.color =  client_embeds.players.color.stopped
        obj.name = "Server offline";

    } else if(data.state == "starting") {
        obj.color = client_embeds.players.color.starting;
        obj.name = "Server starting";

    } else if(!Object.keys(data.query).length) {
        if(settings.debug) { console.log(data); } // This will help if we want to see the object.
        obj.name = "Server can't be queried.";
        obj.desc = "This game/voice server type doesn't support queries.";

    } else {
        // If the server was up to be queried, and the gameserver supports it, we do this.
        obj.name = data.query.name;
        var array = [['Name', 'Score', 'Time']];
        var players = data.query.players.concat(data.query.bots);
        obj.color = client_embeds.players.color.running;

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