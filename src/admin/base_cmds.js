const config = require(`${process.env.root}/config`);
const embed = require(`${process.env.root}/src/admin/embed`);
const _ = require('underscore');
const fs = require('fs');


module.exports = async function (args) {

    let exec;
    let time = Date.now();
    let cmd = `${process.env.root}/src/admin/cmds`;
    let result = "Nothing is invalid, but you probably need to specify a subcommand";
    for(const i in args) {
        const a = args[i];
        cmd += `/${a}`;
        if(fs.existsSync(`${cmd}/${a}.js`) && fs.existsSync(`${cmd}/${args[i+1]}.js`) !== true) {
            exec = require(`${cmd}/${a}`);
        } else if (fs.existsSync(`${cmd}.js`)) {
            exec = require(`${cmd}`);
        } else if(fs.existsSync(`${cmd}`)) {
            // We actually just want to do nothing here.
        } else {
            result = `Invalid command/subcommand : \`${a}\``;
            break;
        }
    }    

    if(_.isFunction(exec)) {
        result = await embed( await exec(args) );
    }

    if(config.debug) {
        console.log(`Result took ${Date.now() - time}ms`);
    }
    return result;
}