/***********************************************\
|*                                             *|
|*                  WISP-JS                    *|
|*     https://github.com/Maineiac/wisp-js     *|
|*                                             *|
|*       Client Permissions Configuration      *|
|*                                             *|
|*  This will only work with role ids. You can *|
|*  get these by doing the following :         *|
|*  Ensure you're in developer mode, if not go *|
|*  to User Settings>Appearance>Advanced,and   *|
|*  hit the button for Developer Mode.         *|
|*  Then go to                                 *|
|*  Your Server>Server Settings>Roles and      *|
|*  right click the role you'd like to copy.   *|
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


module.exports = {
    status: ['*'], // * = No permissions required
    players: ['*'],
    cmd: ['someid', 'someid'], // If you need to, keep adding roles.
    power: ['someid']
    // Don't try to add more commands unless you know what you're doing.
    // You'll break stuff.
}