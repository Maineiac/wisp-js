/***********************************************\
|*                                             *|
|*                  WISP-JS                    *|
|*     https://github.com/Maineiac/wisp-js     *|
|*                                             *|
|*         Bot Settings Configuration          *|
|*                                             *|
|*  All the misc settings are here. They're    *|
|*  each commented for you                     *|
|*                                             *|
|*  If you need help, please check the wiki.   *|
|*                                             *|
|*  Maineiac should link to the proper page    *|
|*  here. If he hasn't, tell him to.           *|
|*                                             *|
|*         Created by : Maineiac#0001          *|
|*                                             *|
|*       Wiki : https://wispjs.isbad.gg/       *|
|*     Discord : https://discord.gg/myJKx9t    *|
|*                                             *|
\***********************************************/

// The character that starts every command.
const prefix = "!" // This needs to be defined here so it can be used in the activity property

module.exports = {

    // This is the root domain of you or your host's panel.
    // Please include the trailing /
    PanelURL: "https://your.panel.gg/",

    // Enable/Disable the Client API, and/or the Admin (Application) API.
    enableClient: true,
    enableAdmin: true,
    
    // This one changes the bot's activity "Playing somegame"
    activity: { // Do not edit this line.

        name: `for ${prefix}help`, // This value can say whatever you want.

        // This should be one of the following :
        // PLAYING, STREAMING, LISTENING, WATCHING, CUSTOM_STATUS
        type: `WATCHING`, 

        // This will have an affect on some types.
        url: `https://maineiac.dev/`

    }, // Do not edit this line.

    // Formats and organizes data in embeds.
    // Opposed to text-tables ina  single code block.
    // Still in development.
    fancyEmbeds: false,

    // The cache holds servers, nodes, etc. Choose how long it waits before refreshing the data.
    cacheTimer: 30,

    // Enable/Disable debug output in console.
    // False is recommended for production.
    debug: false,

    // THIS JUST CALLS WHAT IS DEFINED AT THE TOP
    // DONT TOUCH.
    prefix: prefix

}// Do not edit this line.