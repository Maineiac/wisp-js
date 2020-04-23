const settings = require(`${process.env.root}/config/settings`);
const permissions = require(`${process.env.root}/config/permissions/admin`);

const _ = require('underscore');

const r = `${process.env.root}/src/admin/cmds/`;

const cmds = {
    location: {
        create: require(`${r}location/create`),
        delete: require(`${r}location/delete`),
        edit: require(`${r}location/edit`),
        get: require(`${r}location/get`),
        list: require(`${r}location/list`),
        help: require(`${r}location/help`)
    },
    nest: {
        get: require(`${r}nest/get`),
        list: require(`${r}nest/list`),
        egg: {
            get: require(`${r}nest/egg/get`),
            list: require(`${r}nest/egg/list`)
        },
        help: require(`${r}nest/help`)
    },
    node: {
        allocation: {
            create: require(`${r}node/allocation/create`),
            delete: require(`${r}node/allocation/delete`),
            list: require(`${r}node/allocation/list`),
            help: require(`${r}node/allocation/help`)
        },
        delete: require(`${r}node/delete`),
        edit: require(`${r}node/edit`),
        get: require(`${r}node/get`),
        list: require(`${r}node/list`),
        help: require(`${r}node/help`)
    },
    server: {
        database: {
            list: require(`${r}server/database/list`),
            create: require(`${r}server/database/create`),
            get: require(`${r}server/database/get`),
            "reset-password": require(`${r}server/database/reset-password`),
            delete: require(`${r}server/database/delete`),
            help: require(`${r}server/database/help`)
        },
        edit: {
            details: require(`${r}server/edit/details`),
            limits: require(`${r}server/edit/limits`),
            container: require(`${r}server/edit/container`),
            help: require(`${r}server/edit/help`)
        },
        get: {
            all: require(`${r}server/get/all`),
            details: require(`${r}server/get/details`),
            limits: require(`${r}server/get/limits`),
            container: require(`${r}server/get/container`),
            help: require(`${r}server/get/help`)
        },
        clone: require(`${r}server/clone`),
        create: require(`${r}server/create`),
        delete: require(`${r}server/delete`),
        list: require(`${r}server/list`),
        rebuild: require(`${r}server/rebuild`),
        reinstall: require(`${r}server/reinstall`),
        save: require(`${r}server/save`),
        suspend: require(`${r}server/suspend`),
        unsuspend: require(`${r}server/unsuspend`),
        help: require(`${r}server/help`)
        
    },
    user: {
        create: require(`${r}user/create`),
        delete: require(`${r}user/delete`),
        edit: require(`${r}user/edit`),
        get: require(`${r}user/get`),
        list: require(`${r}user/list`),
        help: require(`${r}user/help`)
    }
}


module.exports = async function (args, roles) {

    
    let time = Date.now();
    let temp_perms, temp_cmd, last, cmd, perms;
    let result = "Nothing is invalid, but you probably need to specify a subcommand";
    
    for(const i in args) {

        const a = args[i];
        
        if(_.isObject(cmds[a]) && !_.isFunction(cmds[a])) {

            temp_perms = permissions[a];
            temp_cmd = cmds[a];

        } else if(temp_cmd && _.isObject(temp_cmd[a]) && !_.isFunction(temp_cmd[a])) {

            temp_perms = temp_perms[a];
            temp_cmd = temp_cmd[a];

        } else if(temp_cmd && _.isFunction(temp_cmd[a])) {

            perms = temp_perms[a];
            cmd = temp_cmd[a]; 
            last = a;
            break;
        } else { 
            result = `Unknown command/subcommand \`${a}\``;

        }
    }

    if(_.isFunction(cmd)) {
        if(args.includes('help') || roles.some(role => perms.includes(role)) || perms.includes('*')) {
            result = await cmd(args)

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