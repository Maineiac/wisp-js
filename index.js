/*                                                  
    db   d8b   db d888888b .d8888. d8888b.           d88b .d8888. 
    88   I8I   88   `88'   88'  YP 88  `8D           `8P' 88'  YP 
    88   I8I   88    88    `8bo.   88oodD'            88  `8bo.   
    Y8   I8I   88    88      `Y8b. 88~~~   C8888D     88    `Y8b. 
    `8b d8'8b d8'   .88.   db   8D 88             db. 88  db   8D 
     `8b8' `8d8'  Y888888P `8888Y' 88             Y8888P  `8888Y' 

                A discord bot for use with the WISP API 
                    https://wisp.gg/

                WISP Documentation
                    https://docs.panel.gg/

                GitHub Repo/Readme
                    https://github.com/Maineiac/wisp-js

                Written by Maineiac
                    https://maineiac.dev
                
                Note :  I don't usually release my work. 
                        Sorry for the mess, 
                        and the practically useless comments.

*/
//Debug
var util = require("util");

// Load config and dependencies.
const config = require('./config.js');
const request = require('./request.js');
const embed = require("./embed.js");

const Discord = require('discord.js');
const client = new Discord.Client();


// This is my favorite part :) The action!

client.on('ready', () => { // Called when the bot is "ready"
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => { // Handles alls messages that the bot can see.
    if(msg.content.startsWith(config.prefix) && !msg.author.bot) {
        var args = msg.content.slice(config.prefix.length).trim().split(/ +/g);

        if(config.servers.hasOwnProperty(args[0])) {
            var hasperms = false;

            for (var i = 0; i < config.permissions[args[1]].length; i++) {

                if(msg.member.roles.has(config.permissions[args[1]][i]) 
                || config.permissions[args[1]].indexOf("*") > -1) {
                    hasperms = true;

                }
            }

            if(!hasperms) {
                msg.channel.send(`No permission to run server command : \`${args[1]}\``);

            } else {

                switch(args[1]) {

                    case 'status':
                        msg.channel.send("dead!");
                    break;

                    case 'players':
                        msg.channel.send("You don't have any.");
                    break;
                    case 'cmd':
                        msg.channel.send("Ok commander!");
                    break;
                    case 'power':
                        msg.channel.send("POWAH!");
                    break;
                }
            }
        } else {
            switch(args[0]) {
                case 'servers':
                    msg.channel.send("We have servers, but you can't see them :)");
                break;
                case 'help':
                    msg.channel.send("This should say something");
                break;
                default:
                    msg.channel.send("Unknown command.");
                break;
            }
        }
    }
});

// Turn the key (connect to discord)
client.login(config.BotToken);