//Debug
var util = require("util");

const config = require('./config.js');

const Discord = require('discord.js');
const client = new Discord.Client();

const axios = require('axios');
const instance = axios.create({

    baseURL: 'https://maineiac.panel.gg',
    timeout: 1000,
    headers: {

        'Content-Type': 'application/json',
        'Accept': 'application/vnd.wisp.v1+json',
        'Authorization': 'Bearer '+config.WISPAPIKey

    }

});
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    instance.get(`${config.PanelURL}api/client/servers/${config.servers.gmod}/utilization`)
    .then(function (response) {
      // handle success
      msg.reply(util.inspect(response.data));
      console.log(response);
      console.log('success');
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      console.log('error');
    });
    msg.reply('pong');
  }
});

client.login(config.BotToken);