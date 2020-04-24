const util = require(`${process.env.root}/src/util.js`);
const settings = require(`${process.env.root}/config/settings`);
module.exports = async function() {
    const p = settings.prefix;
    let obj = util.baseEmbedObj(["shared", "help"]);
    obj.title.text = `${obj.title.text} | Location Commands`;
    obj.desc = `
**Key** :
\`() = required\`
\`[] = optional\`\n
\`\`\`dsconfig\n${p}location list\`\`\`
\`\`\`dsconfig\n${p}location get (locationid)\`\`\`Example : \`!location get 3\`\n
\`\`\`dsconfig\n${p}location delete (locationid/ids)\`\`\`Example : \`!location delete 3,6,9\`\n
\`\`\`dsconfig\n${p}location edit (locationid) (parameters)\`\`\`Example : \`!location edit 3 short=new-loc long="New location name"\`\n
\`\`\`dsconfig\n${p}location create (parameters)\`\`\`Required Parameters : *short*, *long*
Example : \`!location create short=ca-mnt long="Montreal, Canada"\`\n
`

    return obj;
}
