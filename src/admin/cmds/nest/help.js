const util = require(`${process.env.root}/src/util.js`);
const settings = require(`${process.env.root}/config/settings`);
module.exports = async function() {
    const p = settings.prefix;
    let obj = util.baseEmbedObj(["shared", "help"]);
    obj.title.text = `${obj.title.text} | Nest Commands`;
    obj.desc = `
**Key** :
\`() = required\`
\`[] = optional\`\n
\`\`\`dsconfig\n${p}nest list\`\`\`
\`\`\`dsconfig\n${p}nest get (nestid)\`\`\`Example : \`!nest get 3\`\n
\`\`\`dsconfig\n${p}nest egg list (nestid)\`\`\`Example : \`!nest egg list 3\`\n
\`\`\`dsconfig\n${p}nest egg get (nestid) (eggid)\`\`\`Example : \`!nest egg get 3 3\`\n
`

    return obj;
}