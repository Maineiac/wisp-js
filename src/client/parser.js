const _ = require('underscore');

const settings = require(`${process.env.root}/config/settings`);
const aliases = require(`${process.env.root}/config/aliases`);
const permissions = require(`${process.env.root}/config/permissions/client`);

const r = `${process.env.root}/src/client/cmds/`;

const cmds = {
    servers: require(`${r}servers`),
    alias: {
        status: require(`${r}status`),
        players: require(`${r}players`),
        power: require(`${r}rcon`),
        cmd: require(`${r}rcon`)
    }
}

module.exports = async function (args, roles) { // Expects args to be Array()
    let time = Date.now();
    let result;

    if(_.isFunction(cmds[args[0]])) {

        result = await cmds[args[0]]();
        
    } else if(_.isFunction(cmds.alias[args[1]]) && aliases.hasOwnProperty(args[0]))  {

        if(roles.some(role => permissions[args[1]].includes(role))
        || permissions[args[1]].includes('*')) {

            result = await cmds.alias[args[1]](args);

        } else {
            result = `You don't have permission to use \`${args[1]}\``;
        }

    } else if(!_.isFunction(cmds.alias[args[1]]) && aliases.hasOwnProperty(args[0]) ){
        result = `Invalid alias sub-command : \`${args[1]}\``;

    }
    let end = Date.now() - time;
    if(settings.debug) {
        console.log(result);
        console.log(`Client: Result took ${end}ms`);
    }
    return result;
}