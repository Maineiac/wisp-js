/***********************************************\
|*                                             *|
|*                  WISP-JS                    *|
|*     https://github.com/Maineiac/wisp-js     *|
|*                                             *|
|*         Client Embeds Configuration         *|
|*                                             *|
|* IF YOU DON'T KNOW WHAT YOU'RE DOING, DON'T  *|
|* BOTHER WITH THIS FILE.                      *|
|* This holds all the configuration for embeds *|
|* You can modify any color, icon, or title    *|
|* (author). Things are labeled pretty well I  *|
|* think. I shouldn't need to comment every    *|
|* line following.                             *|
|*                                             *|
|*         Created by : Maineiac#0001          *|
|*                                             *|
|*       Wiki : https://wispjs.isbad.gg/       *|
|*     Discord : https://discord.gg/myJKx9t    *|
|*                                             *|
\***********************************************/
module.exports = {
    servers: { // This one is special, you can configure what is shown in the server list.
        icon: "https://img.maineiac.dev/wisp_icons/ico_wisp_servers2.png",
        color: 16751104,
        title: "Server List",
        list: {
            alias: true, // Show the alias of the server (defined above)
            name: true, // Show the name defined on the wisp panel (what you see on the server card)
            ip: "alias", // Show the ip, set to "alias" to show ip alias instead
            port: false, // Show the port, ip (line above) must be enabled, or set to "alias"
            state: false // Show the server's state (on/off/starting), this increases response time by %50/server
            // state should be disabled if you have a lot of servers.
        }
    },
    status: {
        icon: "https://img.maineiac.dev/wisp_icons/ico_wisp_heartbeat.png",
        color:{
            running: 53611,
            starting: 16098851,
            stopped: 13632027
        },
        title: "Server Status"
    },
    players: {
        icon: "https://img.maineiac.dev/wisp_icons/ico_wisp_users.png",
        color: {
            running: 53611,
            starting: 16098851,
            stopped: 13632027
        },
        title: "Player List"
    },
    cmd: {
        icon: "https://img.maineiac.dev/wisp_icons/ico_wisp_api.png",
        color: {
            success: 53611,
            failure: 13632027
        },
        title: "Remote Command"
    },
    power: {
        icon: "https://img.maineiac.dev/wisp_icons/ico_wisp_power.png",
        color: {
            success: 53611,
            failure: 13632027
        },
        title: "Remote Signal"
    },
    help: {
        icon: "https://img.maineiac.dev/wisp_icons/ico_wisp_search.png",
        color: 16751104,
        title: "Help Menu"
    },
    error: {
        icon: "https://img.maineiac.dev/wisp_icons/ico_wisp_announce.png",
        color: 13632027,
        title: "Error!"
    },
    footer: {   // This will be at the bottom of every embed
        icon: "https://img.maineiac.dev/wisp-js.png",
        text: "WISP-JS | Maineiac#0001"
    }
}