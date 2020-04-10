const _ = require('underscore');

const config = require('../../config');
const embed = require('./embed');

const cmds = {
    location: require('./cmds/locations'),
    nest: require('./cmds/nests'),
    node: require('./cmds/nodes'),
    server: require('./cmds/servers'),
    user: require('./cmds/users')

}

module.exports = async function (args) { // Expects args to be Array()
    let time = Date.now();
    let result;

    if(_.isFunction(cmds[args[0]])) {

        result = await embed(
            await cmds[args[0]](args)
        );

    } else {

        result = `Invalid command : \`${args[0]}\``;

    }
    let end = Date.now() - time;
    if(config.debug) {
        console.log(`Result took ${end}ms`);
    }
    return result;
}