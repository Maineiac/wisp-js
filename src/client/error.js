const settings = require(`${process.env.root}/config/settings`);
const shared_embeds = require(`${process.env.root}/config/embeds/shared`);
const errors = {
    400: ['**400** | `Bad Request`', 'Probably a bad config.'],
    401: ['**401** | `Unauthorized`', 'The Dino API key is probably invalid.'],
    403: ['**403** | `Forbidden`', 'Invalid `WISPAPIKey` in config.js'],
    404: ['**404** | `Not Found`', 'The url used for the request was invalid.\n\nThis can happen because :\n • The id assigned to an alias is invalid.\n • Someone tampered with request.js\n • Someone tampered with the command calling request.js'],
    405: ['**405** | `Method Not Allowed`', 'This shouldn\'t happen, contact Maineiac#0001.'],
    412: ['**412** | `Precondition Failed`', 'The server is probably not running.'],
    429: ['**429** | `Too Many Requests`', 'Your bot has tried to use the api too many times recently, it has been temporarily rate limited'],
    500: ['**500** | `Internal Server Error`', 'WISP has had a problem. Contact support.'],
    503: ['**503** | `Service Unavailable`', 'WISP is temporarily offline for maintenance, try again later.'],
    504: ['**504** | `DaemonConnectionException`', 'The daemon isn\'t responding. '],
    'ENOTFOUND': ['**ENOTFOUND**', 'Invalid PanelURL in config.js, no instance to make requests from.'],
    'ECONNABORTED': ['**ECONNABORTED**', 'Axios timed out (took more than 5 seconds) while sending/waiting for a response.']
}
module.exports = function(error, location) {
    const handled = errors[
        (error.response) ? error.response.status : error.code
    ];
    const obj = {
        title: {
            text: shared_embeds.error.title,
            icon: shared_embeds.error.icon
        },  
        color: shared_embeds.error.color, 
        desc: `${handled[0]}\n\n${handled[1]}${(settings.debug) ? `\n\n\`\`\`${location}\`\`\`` : ''}`,
        footer: {
            icon: shared_embeds.footer.icon,
            text: shared_embeds.footer.text
        }
    }
    if(settings.debug) {
        console.log(`Parsed error : ${(error.response) ? error.response.status : error.code} | in : ${location}`);
        console.log(error)
    }
    return obj;
}