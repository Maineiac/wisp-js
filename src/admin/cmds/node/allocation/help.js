const util = require(`${process.env.root}/src/util.js`);
const settings = require(`${process.env.root}/config/settings`);
module.exports = async function() {
    const p = settings.prefix;
    let obj = util.baseEmbedObj(["shared", "help"]);
    obj.title.text = `${obj.title.text} | Node Allocation Commands`;
    obj.desc = `
**Key** :
\`() = required\`
\`[] = optional\`\n
\`\`\`dsconfig\n${p}node allocation list\`\`\`
\`\`\`dsconfig\n${p}node allocation delete (nodeid) (allocationid/ids)\`\`\`Example : \`!node delete 3 54,57,60\`\n
\`\`\`dsconfig\n${p}node allocation create (nodeid) (parameters)\`\`\`Required Parameters : ip, ports
Example : \`!node allocation create 3 ip=127.0.0.1 ports=20115,2016\`\n
`

    return obj;
}