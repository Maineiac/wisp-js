const util = require(`${process.env.root}/src/util.js`);
const settings = require(`${process.env.root}/config/settings`);
module.exports = async function() {
    const p = settings.prefix;
    let obj = util.baseEmbedObj(["shared", "help"]);
    obj.title.text = `${obj.title.text} | Server Editor Commands`;
    obj.desc = `
**Key** :
\`() = required\`
\`[] = optional\`\n
\`\`\`dsconfig\n${p}server edit details (serverid) (params)\`\`\`Example : \`!server edit details 21 name="Some new name"\`\n
\`\`\`dsconfig\n${p}server edit limits (serverid) (params)\`\`\`Example : \`!server edit limits 21 limits.memory=4096\`\n
\`\`\`dsconfig\n${p}server edit container (serverid) (params)\`\`\`Example : \`!server edit container 21 environment.SERVER_JARFILE=server.jar\`\n
`

    return obj;
}