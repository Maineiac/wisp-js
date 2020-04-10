const _ = require('underscore');

const config = require('../../config');
const embed = require('./embed');

const cmds = {

    // Start test commands
    test: function() {
        return {desc: `Test worked!`}
    },
    test2: {
        test: function() {
            return {desc: `Test worked!`}
        }
    },
    test3: {
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
        list: require('./cmds/nodes/list')
    },
    server: require('./cmds/servers'),
    user: require('./cmds/users')

}

module.exports = async function (args) { // Expects args to be Array()
    let time = Date.now();
    let result;

    if(cmds[args[0]] && !_.isFunction(cmds[args[0]]))  {

        if (cmds[args[0]][args[1]] && !_.isFunction(cmds[args[0]][args[1]])) {
            
            if(cmds[args[0]][args[1]][args[2]] && _.isFunction(cmds[args[0]][args[1]][args[2]])) {

                result = await embed(
                    await cmds[args[0]][args[1]][args[2]](args)
                );

            } else {
                result = `Invalid sub sub command : \`${args[2]}\``;
            }

        } else if (cmds[args[0]][args[1]] && _.isFunction(cmds[args[0]][args[1]])) {
            
            result = await embed(
                await cmds[args[0]][args[1]](args)
            );

        } else {
            result = `Invalid sub command : \`${args[1]}\``;
        }

    } else if (cmds[args[0]] && _.isFunction(cmds[args[0]])) {

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