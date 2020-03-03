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

// Declare some requirements
const config = require('./config.js');
const request = require('./bin/request.js');
const embed = require("./bin/embed.js");

const Discord = require('discord.js');
const client = new Discord.Client();


// This is my favorite part :) The action!

client.on('ready', () => { // Called when the bot is "ready"
    console.log("Bot started.");
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => { // Start listening for messages

    // Check if the message starts with the prefix, then break messages into args.
    if(msg.content.startsWith(config.prefix) && !msg.author.bot) { 
        var args = msg.content.slice(config.prefix.length).trim().split(/ +/g);

        // Check if the first argument is a valid server alias
        if(config.servers.hasOwnProperty(args[0])) {
            var hasperms = false;
            var valid = false;

            // Check if second argument is a valid command.
            if(config.permissions.hasOwnProperty(args[1])) {
                valid = true;

                for (var i = 0; i < config.permissions[args[1]].length; i++) {
                    // For every role in the command's permissions array
                    // we will check to see if the user has it.
                    // or if one of said roles is simply "*"
                    if(msg.member.roles.has(config.permissions[args[1]][i]) 
                    || config.permissions[args[1]].indexOf("*") > -1) {
                        hasperms = true;

                    }
                } 
            }
            
            if(!hasperms && valid) { // No permission to run command
                msg.channel.send(`No permission to run server command : \`${args[1]}\``);

            } else if(!valid) { // Invalid command
                msg.channel.send(`Invalid command : \`${args[1]}\``);
                
            } else {

                // Everything checked out ok. Now this will run code
                // based on which command was used, and the arguments
                // that might follow.
                switch(args[1]) {

                    // Handles the following commands : !alias status
                    case 'status': case 'players':   // !alias players

                        // Send a request to the api and handle it's response.
                        request.get(`${config.servers[args[0]]}/utilization`)
                            .then(function (response) { // If we got a response we send a success embed
                                
                                msg.channel.send(embed.gen(args[1], response.data.attributes));

                            }).catch((error) => { // Otherwise we send an error embed

                                msg.channel.send(embed.gen("error", [error.code, error.msg]));

                            });

                    break;
                    
                    // Note : I may try to combine the next two cases like I did the one above.
                    //        Too busy writting comments atm. They're almost identical, so you
                    //        can refer to this case to explain the one below it.
                    // Handles !alias cmd [command]
                    case 'cmd':

                        // Get argument #3 and up as a single string.
                        var cmd = msg.content.replace("!"+args[0]+" "+args[1], "").trim();

                        var options = {  // Options for the following POST request.
                                "command": cmd
                        };

                        // Send a POST request, and handle it's response.
                        request.post(`${config.servers[args[0]]}/command`, options)
                        .then(function (response) { // If we got a response we send a success embed

                            msg.channel.send(embed.gen("cmd", `Successfully sent command : \`${cmd}\``));

                        }).catch((error) => { // Otherwise we send an error embed

                            msg.channel.send(embed.gen("error", [error.code, error.msg]));

                        });

                    break;

                    case 'power':

                        var signal = msg.content.replace("!"+args[0]+" "+args[1], "").trim();

                        var options = {
                                "signal": signal
                        };

                        request.post(`${config.servers[args[0]]}/power`, options)
                        .then(function (response) {

                            msg.channel.send(embed.gen("power", `Successfully sent signal : \`${signal}\``));
                        
                        }).catch((error) => {

                            msg.channel.send(embed.gen("error", [error.code, error.msg]));
                        
                        });

                    break;

                    default: // This is here for my sanity. It should never be called though.
                        msg.channel.send("I had a big problem, this shouldn't happen. | 01");
                    break;

                }
            }

        } else {

            switch(args[0]) {

                case 'servers': // Handles !servers
                    msg.channel.send(embed.gen("servers"));
                break;

                case 'help': // Handles !help
                    msg.channel.send(embed.gen("help"));
                break;

                default: // Same as the default case above.
                    msg.channel.send(`Invalid server alias or base command : \`${args[0]}\``);
                break;
                
            }
        }
    }
});

// Turn the key (connect to discord)
client.login(config.BotToken);