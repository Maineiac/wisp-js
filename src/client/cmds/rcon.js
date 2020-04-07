const config = require('../../../config');
const request = require('../request');

const table = require('text-table');

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
    console.log(`${[signal]}: ${data}`);

    try {
        result = await request.post(
            `servers/${config.servers[args[0]]}/${type}`, 
            {[signal]: data}
        );
        if(result.status && result.status == 204) {
            console.log("good request");
            obj.color = config.embeds[args[1]].color.success
        }
    } catch(error) {
        // 404 - Bad server id/url
        // 412 - Server exists but is offline
        //console.log(error);
        obj.desc = "Failure!\nStatus Code : " + error.response.status;
        //console.log(error.response.data.errors[0]);
        console.log("Caught error : " + error.response.status);
    }
    
    //console.log(result);

    return obj;
}