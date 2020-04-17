const config = require(`${process.env.root}/config`);
const embed = require(`${process.env.root}/src/admin/embed`);
const _ = require('underscore');
const fs = require('fs')

module.exports = async function (args) {

    let time = Date.now();
    let cmd = `${process.env.root}/src/admin/cmds`;
    let result = "Nothing is invalid, but you probably need to specify a subcommand";
    for(const a of args) {
        try {
            let exec = require(`${cmd}/${a}`);
            result = await embed( await exec(args) );
            break;
        } catch (error) {
            if (fs.existsSync(`${cmd}/${a}`)) {
                cmd = `${cmd}/${a}`;
            } else { 
                result = `Invalid command/subcommand : \`${a}\``
                break;
            }
        }
    }

    if(config.debug) {
        console.log(`Result took ${Date.now() - time}ms`);
    }

    return result;
}