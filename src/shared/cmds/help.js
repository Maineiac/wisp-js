const util = require(`${process.env.root}/src/util`);
const settings = require(`${process.env.root}/config/settings`);

function clientHelp() {
    let obj = util.baseEmbedObj(["shared", "help"]);
    obj.desc = `**Base commands**\n\`\`\`${settings.prefix}help | You're looking at it.\n${settings.prefix}servers | Get a list of the available servers.\`\`\`\n**Server commands**\nThese are performed with the command being the alias for the server it's being addressed to. Here is the format for server commands : \n\`${settings.prefix}alias [command] <arguments>\`\n\`\`\`${settings.prefix}alias [status] | Get the state and usage.\n${settings.prefix}alias [players] | Get a list of current players.\n${settings.prefix}alias [power] <signal> | Send power signal.\n${settings.prefix}alias [cmd] <command> | Send command to console.\`\`\``;

    return obj;
}

function adminHelp() {
    let obj = util.baseEmbedObj(["shared", "help"]);
    obj.desc = `This bot is very powerful, please take caution when running admin (application) api commands.\n\n**Admin Commands**\nThere are too many subcommands to list everything here, please check the help menus for each base comand.\n\`\`\`${settings.prefix}location help\n${settings.prefix}nest help\n${settings.prefix}node help\n${settings.prefix}server help\n${settings.prefix}user help\`\`\``;
    return obj;
}

function sharedHelp() {
    obj = util.baseEmbedObj(["shared", "help"])
    obj.desc = `Both the admin and client module are loaded.\n
    You can get the root help embed with one of the following commands :\n
    \`\`\`!help client\n!help admin\`\`\``;
    return obj;
}

function noModule() {
    obj = util.baseEmbedObj(["shared", "error"])
    obj.title.text = `No modules loaded`;
    obj.desc = `Neither the admin or client modules are enabled. The bot has no functionality besides this embed.`;
    return obj;
}
function missingModule(module) {
    obj = util.baseEmbedObj(["shared", "error"])
    obj.title.text = `Module not loaded!`
    obj.desc = `The \`${module}\` module seems to be disabled. Sorry.`;
    return obj;
}

function unknownMenu(module) {
    obj = util.baseEmbedObj(["shared", "error"])
    obj.title = `Unknown...`
    obj.desc = `I realize you're looking for help, but that's not how you do it.\n\nTry starting at \`!help\``;
    return obj;
}

module.exports = async function(args) {
    if(!args[1]) {
        if(settings.enableClient && settings.enableAdmin) {
            result = await sharedHelp();
        } else if(settings.enableClient && !settings.enableAdmin) {
            result = await clientHelp();
        } else if(!settings.enableClient && settings.enableAdmin) {
            result = await adminHelp();
        } else {
            result = await noModule()
        }
    } else if(args[1] == "client") {
        if(settings.enableClient) {
            result = await clientHelp();
        } else {
            result = await missingModule("client");
        }
    } else if(args[1] == "admin") {
        if(settings.enableAdmin) {
            result = await adminHelp();
        } else {
            result = await missingModule("admin");
        }
    } else {
        result = await unknownMenu();
    }
    return result;
}