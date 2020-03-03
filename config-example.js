/* 
    Welcome to the WISP-JS configuration file.

    I have tried to comment everything in
            great detail for you.
    Please take the time to read through
           before asking for help.            */

// Authentication

// You can create your API key here : https://your.panel.gg/account/security
// All users (clients/support ops/admins) can create these.
exports.WISPAPIKey = "YOURAPIKEYHERE"; // Your api key

// If you don't know anything about making a bot, it's easy.
// Follow this tutorial : https://discordpy.readthedocs.io/en/latest/discord.html
// You'll find this key in step 7.
exports.BotToken = "YOURBOTTOKENHERE"; // Your bot token.

// This is your host's panel url.
exports.PanelURL = "https://your.panel.gg/";

// User stuff

// This will start every command.
exports.prefix = "!";

// These images will appear at the top of their respective embed.
exports.icons = {
    status: "https://img.maineiac.dev/wjs_icons/status.png",
    players: "https://img.maineiac.dev/wjs_icons/players.png",
    cmd: "https://img.maineiac.dev/wjs_icons/command.png",
    power: "https://img.maineiac.dev/wjs_icons/power.png",
    help: "https://img.maineiac.dev/wjs_icons/help.png",
    error: "https://img.maineiac.dev/wjs_icons/error.png",
    serverlist: "https://img.maineiac.dev/wjs_icons/servers.png",
}

// Command permissions
// This will only work with role ids. You can get these by doing the following :
// Ensure you're in developer mode, if not go to User Settings>Appearance>Advanced,
// and hit the button for Developer Mode.
// Then go to Your Server>Server Settings>Roles and right click the role you'd
// like to copy.
exports.permissions = {
    status: ['*'], // * = No permissions required
    players: ['*'],
    cmd: ['roleid', 'roleid'], // If you need to, keep adding roles.
    power: ['roleid']
    // Don't try to add more commands unless you know what you're doing.
    // You'll break stuff.
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
