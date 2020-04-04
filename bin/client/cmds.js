const config = require('../../config.js');
const embed = require('./embed.js');

const instance = require('./request.js');

exports.listener = async function(args) { // Expects args to be Array()
    try {
        let result;
        if(config.servers.hasOwnProperty(args[0])) {
            switch(args[1]) {
                case 'status': case 'players':
                    const response = await instance.get(
                        `servers/${config.servers[args[0]]}/utilization`
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
                        `servers/${config.servers[args[0]]}/${type}`, 
                        {[signal]: data}
                    );
                    result = await embed(args[1], data)
                    return result;
                break;
            }
        } else {
            switch(args[0]) {
                case 'servers': case 'help':
                    result = await embed(args[0]);
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