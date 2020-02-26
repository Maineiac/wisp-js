// Authentication

// You can create your API key here : https://your.panel.gg/account/security
// All users (clients/support ops/admins) can create these.
exports.WISPAPIKey = "YOURAPIKEYHERE";

// If you don't know anything about making a bot, it's easy.
// Follow this tutorial : https://discordpy.readthedocs.io/en/latest/discord.html
// You'll find this key in step 7.
exports.BotToken = "YOURBOTTOKENHERE"; // Your bot token.
exports.PanelURL = "https://your.panel.gg/";

// User stuff
exports.prefix = "!"; // This will start every command.
exports.icons = { // These images will appear at the top of their respective embed.
    status: "https://img.maineiac.dev/wisp.png",
    players: "https://img.maineiac.dev/wisp.png",
    cmd: "https://img.maineiac.dev/wisp.png",
    power: "https://img.maineiac.dev/wisp.png",
    help: "https://img.maineiac.dev/wisp.png",
    error: "https://img.maineiac.dev/wisp.png"
}

// Command permissions
exports.permissions = { //
    status: ['*'], // * = No permissions required
    players: ['*'],
    cmd: ['roleid', 'roleid'], // If you need to, keep adding roles.
    power: ['roleid']
}

/* Server id aliases

Commands will be performed on a server by using their alias as a command.
You can find your servers id by checking the URL while looking at it's console.
    
    Example : https://your.panel.gg/server/a2e56ffz
                                     a2e56ffz = ID

    You can also find it by just looking at the WISP index (client panel, not the admin panel)
    It's called the "UUID"
    Screenshot : https://maineiac.isbad.gg/PpDEyTv

    If your server is a gmod darkrp server and it's id is a2e56ffz your alias would
    look something like this :

        darkrp: "a2e56ffz"

    If you have more servers you can add them. This doesn't have a cap.
    Just add a comma at the end of each one. Example :
        
        darkrp: "a2e56ffz",
        ttt: "c2r88cz5"
    
*/                    
exports.servers = { // This supports more servers, just keep adding. 
    alias1: "someid",   // !alias1 [command]
    anotherserveralias: "anotherid",     // !anotherserveralias [command]
    thesecanbeanything: "yougetit"     // !thesecanbeanything [command]
    //HINT : REMEMBER THE COMMA
};

// If you receive an error, look at it before creating an issue. 
// If it mentions this file it's your fault.
