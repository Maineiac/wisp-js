const _ = require('underscore');

const config = require('../../config');
const embed = require('./embed');

const cmds = {

    // Start test commands
    testfunc: function() {
        return {desc: `Test worked!`}
    },
    test: {
        test: function() {
            return {desc: `Test worked!`}
        }
    },
    test2: {
        test: {
            test: function() {
                return {desc: `Test worked!`}
            }
        }
    },
    // end test commands


    location: require('./cmds/locations'),
    nest: require('./cmds/nests'),
    node: {
        allocation: {
            list: require('./cmds/node/allocation/list')
        },
        edit: require('./cmds/node/edit'),
        get: require('./cmds/node/get'),
        list: require('./cmds/node/list'),
        delete: function() {
            return {desc:"I might add this when I'm done with the bot. I don't want to delete my nodes."};
        }
    },
    server: require('./cmds/servers'),
    user: require('./cmds/users')

}

module.exports = async function (args) { // Expects args to be Array()

    let time = Date.now();
    let result, badcmd;
    let cmd = cmds;

    for(i = 0; i < args.length; i++) {

        if(cmd[args[i]]) {
            cmd = cmd[args[i]];

        } else {
            badcmd = args[i];

        }

    }

    if(_.isFunction(cmd)) {
        result = await embed( await cmd(args) );

    } else if(badcmd) {
        result = `Could not find command/subcommand : \`${badcmd}\``;

    } else {
        result = `Invalid command syntax, couldn't resolve problem.`;
    }

    if(config.debug) {
        console.log(`Result took ${Date.now() - time}ms`);
    }

    return result;
}