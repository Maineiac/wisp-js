const settings = require(`${process.env.root}/config/settings`);
const shared_embeds = require(`${process.env.root}/config/embeds/shared`);
module.exports = async function() {
    const prop = {
        title: {
            text: shared_embeds.help.title,
            icon: shared_embeds.help.icon
        },
        color: shared_embeds.help.color,
        desc: "**Base commands**\n```"+
        settings.prefix+"help | You're looking at it.\n"+
        settings.prefix+"servers | Get a list of the available servers.```\n"+
        "**Server commands**\n These are performed with the command being the alias"+
        " for them server it's being addressed to. Here is the format for server commands : \n`"+
        settings.prefix+"alias [command] <arguments>`\n```"+
        settings.prefix+"alias [status] | Get the state and usage.\n"+
        settings.prefix+"alias [players] | Get a list of current players.\n"+
        settings.prefix+"alias [power] <signal> | Send power signal.\n"+
        settings.prefix+"alias [cmd] <command> | Send command to console.```",
        footer: {
            text: shared_embeds.footer.text,
            icon: shared_embeds.footer.icon
        }
    }
    return prop;
}