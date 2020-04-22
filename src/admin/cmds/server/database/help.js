const util = require(`${process.env.root}/src/util.js`);
const settings = require(`${process.env.root}/config/settings`);
module.exports = async function() {
    const p = settings.prefix;
    let obj = util.baseEmbedObj(["shared", "help"]);
    obj.title.text = `${obj.title.text} | Database Commands`;
    obj.desc = `
**Key** :
\`() = required\`
\`[] = optional\`\n
\`\`\`dsconfig\n${p}server database list (serverid)\`\`\`Example : \`!server database list 21\`\n
\`\`\`dsconfig\n${p}server database get (serverid) (databaseid)\`\`\`Example : \`!server database get 21 18\`\n
\`\`\`dsconfig\n${p}server database delete (serverid) (databaseid/ids)\`\`\`Example : \`!server database delete 21 3,6,9\`\n
\`\`\`dsconfig\n${p}server database create (serverid) (databasename) (databasehostid) [remotehost]\`\`\`Example : \`!server database create 3 newdb 6 %\`\n
\`\`\`dsconfig\n${p}server database reset-password (serverid) (databaseid/ids)\`\`\`Example : \`!server database reset-password 21 3\`\n
`

    return obj;
}