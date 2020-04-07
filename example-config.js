/*                                                  
    db   d8b   db d888888b .d8888. d8888b.           d88b .d8888. 
    88   I8I   88   `88'   88'  YP 88  `8D           `8P' 88'  YP 
    88   I8I   88    88    `8bo.   88oodD'            88  `8bo.   
    Y8   I8I   88    88      `Y8b. 88~~~   C8888D     88    `Y8b. 
    `8b d8'8b d8'   .88.   db   8D 88             db. 88  db   8D 
     `8b8' `8d8'  Y888888P `8888Y' 88             Y8888P  `8888Y' 

                A discord bot for use with the WISP API 
                    https://wisp.gg/

                WISP Documentation
                    https://docs.panel.gg/

                GitHub Repo/Readme
                    https://github.com/Maineiac/wisp-js

                Written by Maineiac
                    https://maineiac.dev

                Welcome to the WISP-JS configuration file.
                I have tried to comment everything in
                        great detail for you.
                Please take the time to read through
                    before asking for help.            

    If you receive an error, look at it before creating an issue. 
    If it mentions this file it's your fault.

    At the time of this commit (April 2, 2020) error catching for this is trash
    You'll probably have problems setting this up. Free free to contact
    Maineiac#0001 @ https://discord.gg/myJKx9t
*/


        /*----- Main -----*\
       |------ Config ------|
        \*----------------*/

// You can proably leave this as false. If you ask Maineiac
// for help you might be stting this to true.
exports.debug = true;

// How long will we store server information before running another request?
exports.cacheTimer = 30;

// If you don't know anything about making a bot, don't worry it's easy.
// Follow this tutorial : https://discordpy.readthedocs.io/en/latest/discord.html
// You'll find this key in step 7.
exports.BotToken = "YOURBOTTOKEN"; // Your bot token.


        /*-- WISP Client API --*\
       |----- Authentication ----|
        \*---------------------*/

// This is the key for server owners
// Obviously, admins and support ops can generate them too
// You can create your API key here : https://your.panel.gg/account/security

exports.WISPAPIKey = "YOURAPIKEY"; // Your api key

// This is your host's panel url.
exports.PanelURL = "https://your.panel.gg/";

        /*----- Client -----*\
       |--- Backend Config ---|
        \*------------------*/
// Command permissions
// This will only work with role ids. You can get these by doing the following :
// Ensure you're in developer mode, if not go to User Settings>Appearance>Advanced,
// and hit the button for Developer Mode.
// Then go to Your Server>Server Settings>Roles and right click the role you'd
// like to copy.

// Note : You can disable any of these commands by entering no values.
// By default, power and cmd have the value 'roleid' therefore,
// they will not work for any user, including yourself.
// This is the same as having no values at all, ie : power: []

exports.permissions = {
    status: ['*'], // * = No permissions required
    players: ['*'],
    cmd: ['someid', 'someid'], // If you need to, keep adding roles.
    power: ['someid']
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
// This supports more servers, or less, just keep adding/removing them.  
exports.servers = {  
    alias: "someid",   // !alias1 [command]
    anotherserveralias: "anotherid",     // !anotherserveralias [command]
    thesecanbeanything: "yougetit"     // !thesecanbeanything [command]
    //HINT : REMEMBER THE COMMA
}

        /*------Client------*\
       |-- Frontend Config ---|
        \*------------------*/

// This will start every command.
exports.prefix = "!";

// This one changes the bot's activity "Playing somegame"

exports.activity = {
    name: 'for '+this.prefix+"help", // This value can say whatever you want.
    type: "WATCHING", // This should be one of the following, PLAYING, STREAMING, LISTENING, WATCHING, CUSTOM_STATUS
    url: "https://maineiac.dev/" // This will have an affect on some types.
}

// IF YOU DON'T KNOW WHAT YOU'RE DOING, DON'T BOTHER CONTINUING.
// This next objects holds all the current configuration for embeds
// You can modify any color, icon, or title (author)
// Things are labeled pretty well I think,
// i shouldn't need to comment every line following.
exports.embeds = {
    servers: { // This one is special, you can configure what is shown in the server list.
        icon: "https://img.maineiac.dev/wjs_icons/ico_servers.png",
        color: 16751104,
        title: "Server List",
        list: {
            alias: true, // Show the alias of the server defined above
            name: false, // Show the name defined on the wisp panel (what you see on the server card)
            ip: "alias", // Show the ip, set to "alias" to show ip alias instead
            port: true, // Show the port, ip (line above) must be enabled, or set to "alias"
            state: false // Show the server's state (on/off/starting), this increases response time by %50/server
            // state should be disabled if you have a lot of servers.
        }
    },
    status: {
        icon: "https://img.maineiac.dev/wjs_icons/ico_status.png",
        color:{
            running: 53611,
            starting: 16098851,
            stopped: 13632027
        },
        title: "Server Status"
    },
    players: {
        icon: "https://img.maineiac.dev/wjs_icons/ico_players.png",
        color: {
            running: 53611,
            starting: 16098851,
            stopped: 13632027
        },
        title: "Player List"
    },
    cmd: {
        icon: "https://img.maineiac.dev/wjs_icons/ico_command.png",
        color: {
            success: 53611,
            failure: 13632027
        },
        title: "Remote Command"
    },
    power: {
        icon: "https://img.maineiac.dev/wjs_icons/ico_power.png",
        color: {
            success: 53611,
            failure: 13632027
        },
        title: "Remote Signal"
    },
    help: {
        icon: "https://img.maineiac.dev/wjs_icons/ico_help.png",
        color: 16751104,
        title: "Help Menu"
    },
    error: {
        icon: "https://img.maineiac.dev/wjs_icons/ico_error.png",
        color: 13632027,
        title: "Error!"
    },
    footer: {   // This will be at the bottom of every embed
        icon: "https://img.maineiac.dev/wisp-js.png",
        text: "WISP-JS | Maineiac#0001"
    }
}

// If you receive an error, look at it before creating an issue. 
// If it mentions this file it's your fault.

// At the time of this commit (April 2, 2020) error catching for this is trash
// You'll probably have problems setting this up. Free free to contact
// Maineiac#0001 @ https://discord.gg/myJKx9t