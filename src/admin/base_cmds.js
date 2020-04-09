const config = require('../../config.js');
const user = require('./cmds/user.js');
const node = require('./cmds/node.js');
const location = require('./cmds/location.js');
const server = require('./cmds/server.js');
const nest = require('./cmds/nest.js');


// 
const instance = require('axios').create({

    /*  This is all information that is used to make get/post resquests
        from/to the WISP API. The documentation can be found here :
            https://docs.panel.gg/#introduction
        This configures axios one time to use the information to make requests.
    */
    baseURL: `${config.PanelURL}api/application/`,
    timeout: 5000,
    headers: {

        'Content-Type': 'application/json',
        'Accept': 'application/vnd.wisp.v1+json',
        'Authorization': `Bearer ${config.WISPACPAPIKey}`,
        'User-Agent': 'WISP-JS Discord Bot | Admin'

    }

});



exports.listener = async function(args) { // Expects args to be Array()
    switch(args[0]) {
        case 'user':
            result = await user(args);
            return result;
        case 'node':
            result = await node(args);
            return result;
        case 'location':
            result = await location(args);
            return result;
        case 'server':
            result = await server(args);
            return result;
        case 'nest':
            result = await nest(args);
            return result;
        default:
            return 'Unknown command';
    }
}