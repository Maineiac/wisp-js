/***********************************************\
|*                                             *|
|*                  WISP-JS                    *|
|*     https://github.com/Maineiac/wisp-js     *|
|*                                             *|
|*        Authorization Configuration          *|
|*                                             *|
|*  The three values provided here are very    *|
|*  important, if you're unsure about how to   *|
|*  set them please check out the wiki.        *|
|*                                             *|
|*  Maineiac should link to the proper page    *|
|*  here. If he hasn't, tell him to.           *|
|*                                             *|
|*  When setting the WISP API keys you dont    *|
|*  need to bother if you have the respective  *|
|*  functionality of the bot disabled.         *|
|*                                             *|
|*         Created by : Maineiac#0001          *|
|*                                             *|
|*       Wiki : https://wispjs.isbad.gg/       *|
|*     Discord : https://discord.gg/myJKx9t    *|
|*                                             *|
\***********************************************/

module.exports = {

    // Bot Token
    // Regardless of which side your choose, or if you choose both of them,
    // you'll need a bot token. Here is a simple tutorial for that
    //https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token
    BotToken: "TOKENHERE",
    
    // Client API Key (Client User)
    // If you're using the client side of the bot you'll need to get 
    // your Client API key. You can get this from the `Security Controls` 
    // tab when looking at your servers on the front end panel.
    WISPAPIKey: "KEYHERE",

    // Application API Key (Admin User)
    // If you're using the application (admin) side of the bot you'll 
    // need your Application API key. This can be found in the 
    // `Applciation API` tab on the admin control panel (backend)
    WISPACPAPIKey: "KEYHERE"

}
