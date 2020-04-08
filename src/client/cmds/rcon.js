const config = require('../../../config');
const request = require('../request');
const errors = require('../error');

module.exports = async function(args) {

    let signal, type,result;

    const data = args.slice(2,args.length).join(" ");

    let obj = {

        title: {
            text: config.embeds[args[1]].title,
            icon: config.embeds[args[1]].icon
        },

        color: config.embeds[args[1]].color.failure,

        footer: {
            text: config.embeds.footer.text,
            icon: config.embeds.footer.icon
        }

    }
    if(args[1] == "cmd") {
        type = "command"
        signal = type;
        obj.desc = "Sent command\n`" + data + "`";

    } else if(args[1] == "power") {
        type = args[1];
        signal = "signal";
        obj.desc = "Sent power signal\n`" + data + "`";
    }

    try {
        result = await request.post(
            `servers/${config.servers[args[0]]}/${type}`, 
            {[signal]: data}
        );
        if(result.status && result.status == 204) {
            obj.color = config.embeds[args[1]].color.success
        }
    } catch(error) {
        // 404 - Bad server id/url
        // 412 - Server exists but is offline
        let handled = errors(error.response.status)
        obj.title= {
            text: config.embeds.error.title,
            icon: config.embeds.error.icon
        }
        obj.desc = `${handled[0]}\n${handled[1]}\n`;
        if(config.debug) {
            obj.desc = obj.desc + "```rcon.js : line 33-36```";
            console.log("Caught error : " + error.response.status);
        }
    }

    return obj;
}