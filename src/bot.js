const settings = require(`${process.env.root}/config/settings`);
const auth = require(`${process.env.root}/config/authorization`);
const listener = require('./listener.js');
const Discord = require('discord.js');
const client = new Discord.Client();


// This is my favorite part :) The action!

client.on('ready', () => { // Called when the bot is "ready"
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setStatus('available')
    client.user.setPresence({
        activity: settings.activity
    });
});

client.on('message', msg => { // Start listening for messages
    // Check if the message starts with the prefix, then break messages into args.
    listener(msg);
});

// Turn the key (connect to discord)
client.login(auth.BotToken);