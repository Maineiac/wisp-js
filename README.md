# WISPY

WISPY is a discord bot for use with the [wisp.gg](https://wisp.gg) api.

## Requirements

* A server with a host that uses the WISP Panel
* A server that you can install Node.js on, and host this
* At least enough programming knowledge to edit a configuration file.

## Features <sup><sub>Note: Some commands may not work with certain server types.</sub></sup>

* Supports multiple servers
* Role based permissions system
* Server status
* Player list
* Send power signal
* Send console command


## Installation

You'll have to install Node.js. Here are some tutorials

[Node.js Installation - Windows](https://treehouse.github.io/installation-guides/windows/node-windows.html)

[Node.js Installation - Linux](https://treehouse.github.io/installation-guides/linux/node-linux.html)

Once you've done that you'll pull this repo somewhere and install the dependencies with the following command.
```bash
npm install
```

## Setup

In order to continue, you'll need your WISP API key and Discord bot token.

[Discord Bot setup tutorial](https://discordpy.readthedocs.io/en/latest/discord.html)
Information for getting your bot token is in step 7.

You can create a new API key in the Security Controls tab on the left in the WISP game panel. You can also just go to https://yourhostspanelurl.gg/account/security

At this point you can rename example-config.js to config.js and follow the steps there.

When finished you can run the bot with

```bash
node index.js
```
