const util = require(`${process.env.root}/src/util.js`);
const settings = require(`${process.env.root}/config/settings`);
module.exports = async function() {
    const p = settings.prefix;
    let obj = util.baseEmbedObj(["shared", "help"]);
    obj.title.text = `${obj.title.text} | Node Commands`;
    obj.desc = `
**Key** :
\`() = required\`
\`[] = optional\`\n
\`\`\`dsconfig\n${p}node list\`\`\`
\`\`\`dsconfig\n${p}node get (nodeid)\`\`\`Example : \`!node get 3\`\n
\`\`\`dsconfig\n${p}node delete (nodeid/ids)\`\`\`Example : \`!node delete 3,6,9\`\n
\`\`\`dsconfig\n${p}node edit (nodeid) (parameters)\`\`\`Example : \`!node edit 3 name=some-name memory=1024\`\n
\`\`\`dsconfig\n${p}node allocation help\`\`\`This sub-command has it's own help menu.
`

    return obj;
}