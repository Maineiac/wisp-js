const _ = require('underscore');

const config = require('../../config');
const embed = require('./embed');

const cmds = {
    help: require('./cmds/help'),
    servers: require('./cmds/servers'),
    alias: {
        status: require('./cmds/status'),
        players: require('./cmds/players'),
        power: require('./cmds/rcon'),
        cmd: require('./cmds/rcon')
    }
}

exports.listener = async function (args) { // Expects args to be Array()
    let time = Date.now();
    let result;

    if( _.isFunction( cmds[ args[ 0 ] ] ) ) {

        result = await embed(
            await cmds[ args[ 0 ] ]()
        );

    } else if( _.isFunction( cmds.alias[ args[ 1 ] ] ) && config.servers.hasOwnProperty(args[0]))  {
        result = await embed(
            await cmds.alias[ args[ 1 ] ](args)
        );

    } else if( !_.isFunction( cmds.alias[ args[ 1 ] ] ) && config.servers.hasOwnProperty(args[0]) ){
        result = "Invalid alias sub-command : `" + args[ 1 ] + "`";

    } else {

        result = "Invalid command : `" + args[ 0 ] + "`";

    }
    let end = Date.now() - time;
    console.log("Result took " + end + "ms");
    return result;
}