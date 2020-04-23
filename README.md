![WISP-JS Logo](https://img.maineiac.dev/wisp-js-small.png)

# WISP-JS

WISP-JS is a discord bot for use with the [WISP](https://wisp.gg) api : [(WISP Docs)](https://docs.panel.gg). 

This supports both the client and application api. You can use this bot on a community level, for simply querying your game server. Or you can use this on a host level, allowing you to manipulate nodes, users, servers, locations, and nests from discord. This is of course configurable. The client and application sides can be toggled on and off individually.



## Requirements

* Any machine that you can install Node.js on, and host this
* Node.js 12+
* At least enough programming knowledge to edit a configuration file or two.

## Client Features <sup><sub>Note: Some commands may not work with certain server types.</sub></sup>

* Supports multiple servers
* Role based permissions system
* Server status
* Player list
* Send power signal
* Send console command

## Application Features

* 40 commands to manipulate nodes/users/servers/locations/nests
* Role based permissions system
* I should just list the commands, but see the [WIKI](https://wispjs.isbad.gg) instead


## Installation

You'll have to install Node.js. Here are some tutorials

[Node.js Installation - Windows](https://treehouse.github.io/installation-guides/windows/node-windows.html)

[Node.js Installation - Linux](https://treehouse.github.io/installation-guides/linux/node-linux.html)

Once you've done that you'll clone/download this repo somewhere and install the dependencies with the following command.
```bash
npm install
```

## Setup

Rename the `example-config` directory to `config`

* Authorization | Required | `/config/authorization.js`
* Settings | Required | `/config/settings.js`
* Server Aliases | Client Side Only | `/config/aliases.js`
* Permissions | Required(side based) | `/config/permissions/(client/admin).js`

Configuration is important. Please see the [WIKI](https://wispjs.isbad.gg) for more information.

```bash
node index.js
```


This can be used with any host but [Callum @ SyteSpace](https://sytespace.net/) made a great tutorial on setting it up [here](https://wiki.sytespace.net/general/wisp-js)

Still need help? Join the [WISP-JS Support Discord](https://discord.gg/myJKx9t)
