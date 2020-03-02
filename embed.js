/*
    Repo | wisp-js : https://github.com/Maineiac/wisp-js

    embed.js

    Written by Maineiac
    http://maineiac.dev
*/

var table = require('text-table');
var config = require('./config.js');

exports.gen = function(type, data=null) {
    var embed;
    switch(type) {
        case 'status':
            var name, state, color;
            if(data.state == "on") {
                state = "UP"
                color = 53611;
                name = data.query.name;
            } else if(data.state == "starting") {
                state = "STARTING"
                color = 16098851;
                name = "Server starting";
            } else {
                state = "DOWN"
                color = 13632027;
                name = "Server offline";
            }
            embed = {
                "title": name,
                "description": `\`\`\`Status : ${state}\nMemory : ${data.memory.current}/${data.memory.limit}\nCPU : ${Math.floor(data.cpu.current)}/${data.cpu.limit}\nDisk : ${data.disk.current}/${data.disk.limit}\nPlayers : ${data.players.current}/${data.players.limit}\`\`\``,
                "author": {
                    "name": "Status checker",
                    "icon_url": config.icons.status
                },
                "color": color
            };
        break;
        case 'players':
            var color = 13632027;
            if(data.state == "off") {
                name = "No Response";
                t = "The server appears to be offline";
            } else {
                name = data.query.name;
                var timestr, name, color, t;
                var array = [['Name', 'Score', 'Time']];
                var players = data.query.players.concat(data.query.bots);
                color = 53611;
                for (var i = 0; i < players.length; i++) {
                    var r,s;
                    var time = Math.floor(players[i].time);
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

                    array[i+1] = [  players[i].name, 
                                    players[i].score, 
                                    timestr
                                ];
                }
                if(!array[1]) {
                    t = "There are no players currently on the server.";
                } else {
                    console.log(array)
                    t = table(array, { align: [ 'l', 'c', 'c' ], hsep: [ '    ' ] });
                }
            }
            embed = {
                "title": name,
                "description": `\`\`\`${t}\`\`\``,
                "author": {
                    "name": "Player List",
                    "icon_url": config.icons.players
                },
                "color": color
            };
        break;
        case 'cmd':
            embed = {
                "description": data,
                "author": {
                    "name": "All sent commander!",
                    "icon_url": config.icons.cmd
                },
                "color": 53611
            };
        break;
        case 'power':
            embed = {
                "description": data,
                "author": {
                    "name": "Power Signal",
                    "icon_url": config.icons.power
                },
                "color": 53611
            };
        break;
        case 'servers':
            case 'servers':
            var string = "";
            var array = Object.entries(config.servers);
            for (var i = 0; i < array.length; i++) {
                string += array[i][0]+"\n";
            }
            if(string == "") {
                string == "There hasn't been any servers configured";
            }
            embed = {
                "description": string,
                "author": {
                    "name": "Server List",
                    "icon_url": config.icons.serverlist
                },
                "color": 16098851
            };
        break;
        break;
        case 'help':
            embed = {
                "description": "**Base commands**\n```"+
                config.prefix+"help | You're looking at it.\n"+
                config.prefix+"servers | Get a list of the available servers.```\n"+
                "**Server commands**\n These are performed with the command being the alias"+
                " for the server it's being addressed to. Here is the format for server commands : \n`"+
                config.prefix+"alias [command] <arguments>`\n```"+
                config.prefix+"alias [status] | Get the state and usage.\n"+
                config.prefix+"alias [players] | Get a list of current players.\n"+
                config.prefix+"alias [power] <signal> | Send power signal.\n"+
                config.prefix+"alias [cmd] <command> | Send command to console.```",
                "author": {
                    "name": "Help",
                    "icon_url": config.icons.help
                },
                "color": 16098851
            };
        break;
        case 'error':
            embed = {
                "title": data[0],
                "description": data[1],
                "author": {
                    "name": "Error!",
                    "icon_url": config.icons.error
                },
                "color": 13632027
            };
        break;
        case 'catastrophic':
            embed = {
                "title": "There was a serious problem.",
                "description": "I was unable to connect to the panel with the URL provided. Either I have been misconfigured, or WISP died. I supposed you could be using a custom url and the domain expired, or lots of other issues. You or whoever has access should check my configuration though.",
                "author": {
                    "name": "Error!",
                    "icon_url": config.icons.error
                },
                "color": 13632027
            };
        break;
    }
    return {embed};
}
