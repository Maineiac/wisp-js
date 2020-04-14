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


    location: {
        list: require('./cmds/location/list'),
        get: require('./cmds/location/get'),
        create: require('./cmds/location/create'),
        edit: require('./cmds/location/edit'),
        delete: require('./cmds/location/delete')
    },
    nest: {},
    node: {
        allocation: {
            list: require('./cmds/node/allocation/list'),
            create: require('./cmds/node/allocation/create'),
            delete: require('./cmds/node/allocation/delete')
        },
        edit: require('./cmds/node/edit'),
        get: require('./cmds/node/get'),
        list: require('./cmds/node/list'),
        delete: function() {
            return {desc:"I might add this when I'm done with the bot. I don't want to delete my nodes."};
        }
    },
    server: {},
    user: {
        edit: require('./cmds/user/edit'),
        get: require('./cmds/user/get'),
        list: require('./cmds/user/list'),
        create: require('./cmds/user/create'),
        delete: require('./cmds/user/delete')
    }

}

module.exports = async function (args) { // Expects args to be Array()

    let time = Date.now();
    let result, badcmd;
    let cmd = cmds;

    for(i = 0; i < args.length; i++) {

        if(cmd[args[i]]) {
            cmd = cmd[args[i]];

        } else {
            badcmd = (badcmd) ? badcmd : args[i];

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