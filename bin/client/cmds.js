const config = require('../../config.js');
const embed = require('./embed.js');

const instance = require('axios').create({

    /*  This is all information that is used to make get/post resquests
        from/to the WISP API. The documentation can be found here :
            https://docs.panel.gg/#introduction
        This configures axios one time to use the information to make requests.
    */
    baseURL: `${config.PanelURL}api/client/servers/`,
    timeout: 5000,
    headers: {

        'Content-Type': 'application/json',
        'Accept': 'application/vnd.wisp.v1+json',
        'Authorization': `Bearer ${config.WISPAPIKey}`,
        'User-Agent': 'WISP-JS Discord Bot | Client'

    }

});

exports.listener = async function(args) { // Expects args to be Array()
    try {
        let result;
        if(config.servers.hasOwnProperty(args[0])) {
            switch(args[1]) {
                case 'status': case 'players':
                    const response = await instance.get(
                        `${config.servers[args[0]]}/utilization`
                    );
                    result = await embed(args[1], response);
                    return result;
                break;
                case 'cmd': case 'power':
                    let type = "command"
                    let signal = type;
                    let data = args.slice(2,args.length).join(" ");
                    if(args[1] == "power") {
                        type = args[1];
                        signal = "signal";
                    }
                    await instance.post(
                        `${config.servers[args[0]]}/${type}`, 
                        {[signal]: data}
                    );
                    result = await embed(args[1], data)
                    return result;
                break;
            }
        } else {
            switch(args[0]) {
                case 'servers':
                    result = await embed("servers");
                    return result;
                break;
                default:
                    result = "Invalid command?";
                    return result;
                break;
            }
        }
    } catch(error) {
        console.log(error);
    }
}