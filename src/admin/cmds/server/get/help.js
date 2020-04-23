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
\`\`\`dsconfig\n${p}server get all (serverid) (params)\`\`\`Example : \`!server get all 21\`\n
\`\`\`dsconfig\n${p}server get details (serverid) (params)\`\`\`Example : \`!server get details 21\`\n
\`\`\`dsconfig\n${p}server get limits (serverid) (params)\`\`\`Example : \`!server get limits 21\`\n
\`\`\`dsconfig\n${p}server get container (serverid) (params)\`\`\`Example : \`!server get container 21\`\n
`

    return obj;
}