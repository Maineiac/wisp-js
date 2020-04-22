const aliases = require(`${process.env.root}/config/aliases`);
const client_embeds = require(`${process.env.root}/config/embeds/client`);
const shared_embeds = require(`${process.env.root}/config/embeds/shared`);
const request = require(`${process.env.root}/src/client/request`);
const errors = require(`${process.env.root}/src/client/error`);

module.exports = async function(args) {

    let signal, type,result;

    const data = args.slice(2,args.length).join(" ");

    let obj = {

        title: {
            text: client_embeds[args[1]].title,
            icon: client_embeds[args[1]].icon
        },

        color: client_embeds[args[1]].color.failure,

        footer: {
            text: shared_embeds.footer.text,
            icon: shared_embeds.footer.icon
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
            `servers/${aliases[args[0]]}/${type}`, 
            {[signal]: data}
        );
        if(result.status && result.status == 204) {
            obj.color = client_embeds[args[1]].color.success
        }
    } catch(error) {
        // 404 - Bad server id/url
        // 412 - Server exists but is offline
        return errors(error, 'rcon.js : line 38');
    }

    return obj;
}