const settings = require(`${process.env.root}/config/settings`);
const shared_embeds = require(`${process.env.root}/config/embeds/shared`);
const errors = {
    400: ['Probably a bad config.'],
    401: ['The Dino API key is probably invalid.'],
    403: ['Invalid `WISPAPIKey` in config.js'],
    404: ['The url used for the request was invalid.\n\nThis can happen because :\n • The id/name provided for the node/server/allocation/egg/nest/location/user is invalid.\n • Someone tampered with request.js\n • Someone tampered with the command calling request.js'],
    405: ['This shouldn\'t happen, contact Maineiac#0001.'],
    412: ['The server is probably not running.'],
    422: ['Missing required parameters. Hopefully I print the fields missing below.'],
    429: ['Your bot has tried to use the api too many times recently, it has been temporarily rate limited'],
    500: ['WISP has had a problem. Contact support.'],
    503: ['WISP is temporarily offline for maintenance, try again later.'],
    504: ['The daemon isn\'t responding. '],
    'ENOTFOUND': ['Invalid PanelURL in config.js, no instance to make requests from.'],
    'ENOENT': ['I needed, and was unable, to load a file on the system.']
}
module.exports = function (error, location) {

    const handled = [
        (error.response) ? `**${error.response.status}** | \`${error.response.statusText}\`` : `**${error.code}**`,
        errors[(error.response) ? error.response.status : error.code]
    ];

    const obj = {
        title: {
            text: shared_embeds.error.title,
            icon: shared_embeds.error.icon
        },
        color: shared_embeds.error.color,
        desc: `There was an error that I don't know how to handle.`,
        footer: {
            icon: shared_embeds.footer.icon,
            text: shared_embeds.footer.text
        }
    }
    if (handled) {
        obj.desc = `${handled[0]}\n\n${handled[1]}${(settings.debug) ? `\n\n\`\`\`${location}\`\`\`` : ''}`;
    } else {
        obj.desc = "Unhandled";
    }
    if(error.response && error.response.data.errors) {
        let build = "";
        for(const e of error.response.data.errors) {
            build = `${build}${e.detail}\n`;
        }
        obj.desc = `${obj.desc}\n\`\`\`\n${build}\`\`\``;
    }

    if (settings.debug) {
        console.log(`Parsed error : ${(error.response) ? error.response.status : error.code} | in : ${location}`);
        console.log(error);
    }
    return obj;
}