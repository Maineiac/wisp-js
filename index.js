/*                                                  
    db   d8b   db d888888b .d8888. d8888b.           d88b .d8888. 
    88   I8I   88   `88'   88'  YP 88  `8D           `8P' 88'  YP 
    88   I8I   88    88    `8bo.   88oodD'            88  `8bo.   
    Y8   I8I   88    88      `Y8b. 88~~~   C8888D     88    `Y8b. 
    `8b d8'8b d8'   .88.   db   8D 88             db. 88  db   8D 
     `8b8' `8d8'  Y888888P `8888Y' 88             Y8888P  `8888Y' 

                A discord bot for use with the WISP API 
                    https://wisp.gg/

                Documentation
                    https://docs.panel.gg/

                Written by Maineiac
                    https://maineiac.dev

*/
//Debug
var util = require("util");

// Load config and dependencies.
const config = require('./config.js');

const Discord = require('discord.js');
const client = new Discord.Client();

const axios = require('axios');
const instance = axios.create({

    /*  This is all information that is used to make get/post resquests
        from/to the WISP API. The documentation can be found here :
            https://docs.panel.gg/#introduction
        This configures axios one time to use the information to make requests.
    */
    baseURL: `${config.PanelURL}api/client/servers/`,
    timeout: 1000,
    headers: {

        'Content-Type': 'application/json',
        'Accept': 'application/vnd.wisp.v1+json',
        'Authorization': `Bearer ${config.WISPAPIKey}`

    }

});

// This is my favorite part :) The action!

client.on('ready', () => { // Called when the bot is "ready"
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => { // Handles alls messages that the bot can see.
    if (msg.content === '!gmod') { // Test command "!gmod"

        // Get Server Resourc
        instance.get(`${config.servers.gmod}/utilization`)
        .then(function (response) { // Successfully received a response.

            msg.reply(util.inspect(response.data)); // Respond to the user with the data "stats" object.
            console.log(response.data);

        })
        .catch(function (error) { 

            if (error.response) { // Error response received.
                msg.reply(error.response.status);

            } else if (error.request) { // No response.
                msg.reply("Couldn't find domain. Check that the URL is properly configured.");

            } else {  // Something else, this seems really bad.
                msg.reply("Something really bad happened");
                console.log('Error', error.message);

            }
            
        });
    }
});

// Turn the key (connect to discord)
client.login(config.BotToken);