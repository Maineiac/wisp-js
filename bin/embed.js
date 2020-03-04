/*
    Repo | wisp-js : https://github.com/Maineiac/wisp-js

    embed.js

    Written by Maineiac
    http://maineiac.dev


    This is a big mess, I'm aware.
*/

// Declare some requirements.
const table = require('text-table');
const config = require('../config.js');
const util = require('./util.js')
const Discord = require('discord.js');

// A function that returns an embed object.
exports.gen = function(type, data=null) {
    const embed = new Discord.RichEmbed();

    switch(type) {

        // "Status" embed
        case 'status':

            // This expects data to be a "stats" object
            // https://docs.panel.gg/#stats

            // First we hande the data
            var name, color, array, t;
            
            if(data.state == "on") {
                color = 53611;
                name = data.query.name;
                
                // The server is running, lets put resource usage in a table.
                array = [   
                    ["Status", data.state.toUpperCase()],
                    ["Memory", data.memory.current+'/'+data.memory.limit],
                    ["CPU", Math.floor(data.cpu.current)+'/'+data.cpu.limit],
                    ["Disk", data.disk.current+'/'+data.disk.limit],
                    ["Players", data.players.current+'/'+data.players.limit]
                ];
                t = table(array, { align: [ 'c', 'c' ], hsep: [ '     ' ] });

            } else if(data.state == "starting") {
                color = 16098851;
                name = "Server starting";

            } else {
                color = 13632027;
                name = "Server offline";

            }

            // and plug it all into our embed
            embed.setTitle(name)
            .setAuthor("Status checker", config.icons.status)
            .setColor(color)
            .setTimestamp()
            if(t) { embed.setDescription(`\`\`\`${t}\`\`\``) };

        break;

        // "Player list" embed
        case 'players':

            // This expects data to be a "stats" object
            // https://docs.panel.gg/#stats

            // First we hande the data
            var color = 13632027;

            if(data.state == "off") {
                name = "No Response";
                t = "The server appears to be offline";

            } else if(data.state == "starting") {
                color = 16098851;
                name = "Server hasn't started";
                t = "The server seems to be in a starting state.";

            } else if(!Object.keys(data.query).length) {
                name = "Server can't be queried."; // Sadly I can't do anything about this :pepecry:
                t = "This game/voice server type doesn't support queries.";

            } else {
                // If the server was up to be queried, and the gameserver supports it, we do this.
                name = data.query.name;
                var name, color, t;
                var array = [['Name', 'Score', 'Time']];
                var players = data.query.players.concat(data.query.bots);
                color = 53611;

                for (var i = 0; i < players.length; i++) {
                    // Each player is stored as an array inside of array array[playerindex]
                    array[i+1] = [  players[i].name, 
                                    players[i].score, 
                                    util.formatTime(players[i].time)
                                ];

                }
                if(!array[1]) { // Playerlist is empty
                    t = "There are no players currently on the server.";

                } else { // Pass our array to the text-table module, returns a "table"
                    t = table(array, { align: [ 'l', 'c', 'c' ], hsep: [ '    ' ] });

                }
            }

            // Put all that juicy data to use
            embed.setTitle(name)
            .setAuthor("Player List", config.icons.players)
            .setColor(color)
            .setDescription(`\`\`\`${t}\`\`\``)
            .setTimestamp();

        break;

        // "command" embed
        case 'cmd':
            // Expects data to be a string.
            // There isn't much data to handle if there was a 204 reponse.
            // We're simply informing the user of the success.
            embed.setAuthor("All sent commander!", config.icons.cmd)
            .setColor(53611)
            .setDescription(data)
            .setTimestamp();

        break;

        // "power" embed
        case 'power':
            // Expects data to be a string
            // This does about the same thing as above. I think I should
            // combine the two, but I'd like the icon to be configurable.
            embed.setAuthor("Power Signal", config.icons.power)
            .setColor(53611)
            .setDescription(data)
            .setTimestamp();

        break;

        // "Server list" embed
        case 'servers':
            // Expects data to be null
            // We'll take the servers that should have been configure
            // and present thier aliases to the user.
            var string = "";
            var array = Object.entries(config.servers);

            for (var i = 0; i < array.length; i++) {
                string += array[i][0]+"\n"; // This does the trick

            }

            if(string == "") { // In-case you forgot to configure any servers.
                string == "There hasn't been any servers configured";

            }

            // Present the array to the user
            embed.setAuthor("Server List", config.icons.serverlist)
            .setColor(16098851)
            .setDescription(string)
            .setTimestamp();

        break;

        // "help" embed
        case 'help':
            // Expects data to be null
            // Simply returns helpful information in an embed
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

        // "error" embed
        case 'error':
            // Expects data to have come from error.js.
            // It should give an informative message, if it doesn't and you just see "Error!"
            // inform Maineiac on the steps to reproduce the problem. 
            embed.setTitle(data[0])
            .setAuthor("Error", config.icons.error)
            .setColor(13632027)
            .setDescription(data[1])
            .setTimestamp();

        break;

    }

    // Send the embed back to index.js
    return {embed}

}
