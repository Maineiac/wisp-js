const settings = require(`${process.env.root}/config/settings`);
const permissions = require(`${process.env.root}/config/permissions/admin`);
const embed = require(`${process.env.root}/src/admin/embed`);

const _ = require('underscore');
const fs = require('fs');

const r = `${process.env.root}/src/admin/cmds/`;

const cmds = {
    location: {
        create: require(`${r}location/create`),
        delete: require(`${r}location/delete`),
        edit: require(`${r}location/edit`),
        get: require(`${r}location/get`),
        list: require(`${r}location/list`)
    },
    nest: {
        get: require(`${r}nest/get`),
        list: require(`${r}nest/list`),
        egg: {
            get: require(`${r}nest/egg/get`),
            list: require(`${r}nest/egg/list`)
        }
    },
    node: {
        allocation: {
            create: require(`${r}node/allocation/create`),
            delete: require(`${r}node/allocation/delete`),
            list: require(`${r}node/allocation/list`)
        },
        delete: require(`${r}node/delete`),
        edit: require(`${r}node/edit`),
        get: require(`${r}node/get`),
        list: require(`${r}node/list`)
    },
    server: {
        database: {
            list: require(`${r}server/database/list`),
            create: require(`${r}server/database/create`),
            "reset-password": require(`${r}server/database/reset-password`),
            delete: require(`${r}server/database/delete`)
        },
        edit: {
            details: require(`${r}server/edit/details`),
            limits: require(`${r}server/edit/limits`),
            container: require(`${r}server/edit/container`)
        },
        get: {
            all: require(`${r}server/get/all`),
            details: require(`${r}server/get/details`),
            limits: require(`${r}server/get/limits`),
            container: require(`${r}server/get/container`)
        },
        create: require(`${r}server/create`),
        delete: require(`${r}server/delete`),
        list: require(`${r}server/list`),
        rebuild: require(`${r}server/rebuild`),
        reinstall: require(`${r}server/reinstall`),
        save: require(`${r}server/save`),
        suspend: require(`${r}server/suspend`),
        unsuspend: require(`${r}server/unsuspend`)
        
    },
    user: {
        create: require(`${r}user/create`),
        delete: require(`${r}user/delete`),
        edit: require(`${r}user/edit`),
        get: require(`${r}user/get`),
        list: require(`${r}user/list`)
    }
}

module.exports = async function (args, roles) {

    
    let time = Date.now();
    let temp_perms, temp_cmd, last, cmd, perms;
    let result = "Nothing is invalid, but you probably need to specify a subcommand";
    
    for(const i in args) {

        const a = args[i];
        
        if(
        _.isObject(permissions[a]) && !_.isFunction(permissions[a]) && 
        _.isObject(cmds[a]) && !_.isFunction(cmds[a])) {

            temp_perms = permissions[a];
            temp_cmd = cmds[a];

        } else if(
        temp_perms && _.isObject(temp_perms[a]) && !_.isFunction(temp_perms[a]) &&
        temp_cmd && _.isObject(temp_cmd[a]) && !_.isFunction(temp_cmd[a])) {

            temp_perms = temp_perms[a];
            temp_cmd = temp_cmd[a];

        } else if(temp_perms && _.isArray(temp_perms[a]) && temp_cmd && _.isFunction(temp_cmd[a])) {

            perms = temp_perms[a];
            cmd = temp_cmd[a]; 
            last = a;
            break;
        } else { 
            result = `Unknown command/subcommand \`${a}\``;

        }
    }

    if(_.isFunction(cmd)) {
        if(roles.some(role => perms.includes(role))) {
            result = await embed( await cmd(args) ); 

        } else {
            result = `No permission to run command/subcommand \`${last}\``;

        }
    }

    if(settings.debug) {
        console.log(result);
        console.log(`Result took ${Date.now() - time}ms`);
    }
    return result;
}