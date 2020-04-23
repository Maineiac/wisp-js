/***********************************************\
|*                                             *|
|*                  WISP-JS                    *|
|*     https://github.com/Maineiac/wisp-js     *|
|*                                             *|
|*       Admin Permissions Configuration       *|
|*                                             *|
|*  This is a place to configure permissions   *|
|*  for all admin commands or individual admin *|
|*  commands. This permissions system is based *|
|*  on discord roles. You may only use role    *|
|*  ids, but I may implement names in the      *|
|*  future. Soon:tm:                           *|
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

// You can define more constants to name your role id's
// Or you can add id's like the other examples
const master = "Someid";
const anotherole = "anotherid";

module.exports = {
    location: {
        create: [master, "moreids", "moreids2"],
        delete: [master, "moreids"],
        edit: [master, "moreids"],
        get: [master, anotherole, "moreids"],
        list: [master, anotherole, "moreids"]
    },
    nest: {
        get: [master, anotherole],
        list: [master, anotherole],
        egg: {
            get: [master, anotherole],
            list: [master, anotherole]
        }
    },
    node: {
        allocation: {
            create: [master],
            delete: [master],
            list: [master, anotherole]
        },
        delete: [master],
        edit: [master],
        get: [master, anotherole],
        list: [master, anotherole]
    },
    server: {
        database: {
            list: [master],
            create: [master],
            get: [master],
            "reset-password": [master],
            delete: [master]
        },
        edit: {
            details: [master],
            limits: [master],
            container: [master]
        },
        get: {
            all: [master,anotherole],
            details: [master, anotherole],
            limits: [master, anotherole],
            container: [master, anotherole]
        },
        clone: [master],
        create: [master],
        delete: [master],
        list: [master, anotherole],
        rebuild: [master],
        reinstall: [master],
        save: [master],
        suspend: [master],
        unsuspend: [master]
        
    },
    user: {
        create: [master],
        delete: [master],
        edit: [master],
        get: [master],
        list: [master]
    }

}