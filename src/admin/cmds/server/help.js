const util = require(`${process.env.root}/src/util.js`);
const settings = require(`${process.env.root}/config/settings`);
module.exports = async function() {
    const p = settings.prefix;
    let obj = util.baseEmbedObj(["shared", "help"]);
    obj.title.text = `${obj.title.text} | Server Commands`;
    obj.desc = `
The server command is the most complicated command I have.\n
**Key** :
\`() = required\`
\`[] = optional\`\n
\`\`\`dsconfig\n${p}server list\`\`\`
\`\`\`dsconfig\n${p}server get help\`\`\`This sub-command has it's own help menu.
\`\`\`dsconfig\n${p}server edit help\`\`\`This sub-command has it's own help menu.
\`\`\`dsconfig\n${p}server create help\`\`\`This sub-command has it's own help menu.
\`\`\`dsconfig\n${p}server clone (id) (allocationid)\`\`\`Example : \`!server clone 54 357\`\n
\`\`\`dsconfig\n${p}server save (id) (name)\`\`\`Example : \`!server save 3 gmod\`\n
\`\`\`dsconfig\n${p}server reinstall (serverid/ids)\`\`\`Example : \`!server reinstall 3,6,9\`\n
\`\`\`dsconfig\n${p}server rebuild (serverid/ids)\`\`\`Example : \`!server rebuild 3,6,9\`\n
\`\`\`dsconfig\n${p}server suspend (serverid/ids)\`\`\`Example : \`!server suspend 3,6,9\`\n
\`\`\`dsconfig\n${p}server unsuspend (serverid/ids)\`\`\`Example : \`!server unsuspend 3,6,9\`\n
\`\`\`dsconfig\n${p}server delete (serverid/ids)\`\`\`Example : \`!server delete 3,6,9\`\n
`

    return obj;
}