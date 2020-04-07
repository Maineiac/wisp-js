const config = require('../../../config');
module.exports = async function() {
    const prop = {
        title: {
            text: config.embeds.help.title,
            icon: config.embeds.help.icon
        },
        color: config.embeds.help.color,
        desc: "**Base commands**\n```"+
        config.prefix+"help | You're looking at it.\n"+
        config.prefix+"servers | Get a list of the available servers.```\n"+
        "**Server commands**\n These are performed with the command being the alias"+
        " for them server it's being addressed to. Here is the format for server commands : \n`"+
        config.prefix+"alias [command] <arguments>`\n```"+
        config.prefix+"alias [status] | Get the state and usage.\n"+
        config.prefix+"alias [players] | Get a list of current players.\n"+
        config.prefix+"alias [power] <signal> | Send power signal.\n"+
        config.prefix+"alias [cmd] <command> | Send command to console.```",
        footer: {
            text: config.embeds.footer.text,
            icon: config.embeds.footer.icon
        }
    }
    return prop;
}