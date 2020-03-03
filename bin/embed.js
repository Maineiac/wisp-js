/*
    Repo | wisp-js : https://github.com/Maineiac/wisp-js

    embed.js

    Written by Maineiac
    http://maineiac.dev


    This is a big mess, I'm aware.
*/

const table = require('text-table');
const config = require('../config.js');
const util = require('./util.js')
const Discord = require('discord.js');

exports.gen = function(type, data=null) {
    //var embed;
    const embed = new Discord.RichEmbed()
    switch(type) {
        case 'status':
            var name, color;
            if(data.state == "on") {
                color = 53611;
                name = data.query.name;
            } else if(data.state == "starting") {
                color = 16098851;
                name = "Server starting";
            } else {
                color = 13632027;
                name = "Server offline";
            }
            var state = data.state.toUpperCase();
            embed.setTitle(name)
            .setAuthor("Status checker", config.icons.status)
            .setColor(color)
            .setDescription(`\`\`\`Status : ${state}\nMemory : ${data.memory.current}/${data.memory.limit}\nCPU : ${Math.floor(data.cpu.current)}/${data.cpu.limit}\nDisk : ${data.disk.current}/${data.disk.limit}\nPlayers : ${data.players.current}/${data.players.limit}\`\`\``)
            .setTimestamp()
        break;
        case 'players':
            var color = 13632027;
            if(data.state == "off") {
                name = "No Response";
                t = "The server appears to be offline";
            } else if(data.state == "starting") {
                color = 16098851;
                name = "Server hasn't started";
                t = "The server seems to be in a starting state.";
            } else if(!Object.keys(data.query).length) {
                color = 13632027;
                name = "Server can't be queried.";
                t = "This game/voice server type doesn't support queries.";
            } else {
                name = data.query.name;
                var name, color, t;
                var array = [['Name', 'Score', 'Time']];
                var players = data.query.players.concat(data.query.bots);
                color = 53611;
                for (var i = 0; i < players.length; i++) {

                    array[i+1] = [  players[i].name, 
                                    players[i].score, 
                                    util.formatTime(players[i].time)
                                ];
                }
                if(!array[1]) {
                    t = "There are no players currently on the server.";
                } else {
                    t = table(array, { align: [ 'l', 'c', 'c' ], hsep: [ '    ' ] });
                }
            }
            embed.setTitle(name)
            .setAuthor("Player List", config.icons.players)
            .setColor(color)
            .setDescription(`\`\`\`${t}\`\`\``)
            .setTimestamp()
        break;
        case 'cmd':
            embed.setAuthor("All sent commander!", config.icons.cmd)
            .setColor(53611)
            .setDescription(data)
            .setTimestamp()
        break;
        case 'power':
            embed.setAuthor("Power Signal", config.icons.power)
            .setColor(53611)
            .setDescription(data)
            .setTimestamp()
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
            embed.setAuthor("Server List", config.icons.serverlist)
            .setColor(16098851)
            .setDescription(string)
            .setTimestamp()
        break;
        break;
        case 'help':
            embed.setAuthor("Help", config.icons.help)
            .setColor(16098851)
            .setDescription("**Base commands**\n```"+
            config.prefix+"help | You're looking at it.\n"+
            config.prefix+"servers | Get a list of the available servers.```\n"+
            "**Server commands**\n These are performed with the command being the alias"+
            " for the server it's being addressed to. Here is the format for server commands : \n`"+
            config.prefix+"alias [command] <arguments>`\n```"+
            config.prefix+"alias [status] | Get the state and usage.\n"+
            config.prefix+"alias [players] | Get a list of current players.\n"+
            config.prefix+"alias [power] <signal> | Send power signal.\n"+
            config.prefix+"alias [cmd] <command> | Send command to console.```",)
            .setTimestamp();
        break;
        case 'error':
            embed.setTitle(data[0])
            .setAuthor("Error", config.icons.error)
            .setColor(13632027)
            .setDescription(data[1])
            .setTimestamp()
        break;
    }
    return {embed}
}
