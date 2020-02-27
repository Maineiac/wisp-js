/*
    Repo | wisp-js : https://github.com/Maineiac/wisp-js

    embed.js

    Written by Maineiac
    http://maineiac.dev
*/

var table = require('text-table');
var config = require('./config.js');

exports.gen = function(type, response=null) {
    var data = response.attributes;
    var embed;
    switch(type) {
        case 'status':
            var name, state, color;
            if(data.state == "on") {
                state = "UP"
                color = 53611;
                name = data.query.name;
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
            embed = {
                "title": name,
                "description": `\`\`\`${data}\`\`\``,
                "author": {
                    "name": "Player List",
                    "icon_url": config.icons.players
                },
                "color": 53611
            };
        break;
        case 'cmd':
            embed = {
                "description": `\`\`\`${data}\`\`\``,
                "author": {
                    "name": "Command Sent",
                    "icon_url": config.icons.cmd
                },
                "color": 53611
            };
        break;
        case 'power':
            embed = {
                "description": `\`\`\`${data}\`\`\``,
                "author": {
                    "name": "Power Signal",
                    "icon_url": config.icons.power
                },
                "color": 53611
            };
        break;
        case 'servers':
            embed = {
                "description": `\`\`\`${data}\`\`\``,
                "author": {
                    "name": "Server List",
                    "icon_url": config.icons.serverlist
                },
                "color": 16098851
            };
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
    }
    return {embed};
}
