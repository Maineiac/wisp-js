const util = require(`${process.env.root}/src/util.js`);
const settings = require(`${process.env.root}/config/settings`);
module.exports = async function() {
    const p = settings.prefix;
    let obj = util.baseEmbedObj(["shared", "help"]);
    obj.title.text = `${obj.title.text} | User Commands`;
    obj.desc = `
**Key** :
\`() = required\`
\`[] = optional\`\n
\`\`\`dsconfig\n${p}user list\`\`\`
\`\`\`dsconfig\n${p}user get (userid)\`\`\`Example : \`!user get 3\`\n
\`\`\`dsconfig\n${p}user delete (userid/ids)\`\`\`Example : \`!user delete 6,9,12\`\n
\`\`\`dsconfig\n${p}user edit (parameters)\`\`\`Example : \`!user edit 9 email=someone@maineiac.dev"\`\n
\`\`\`dsconfig\n${p}user create (parameters)\`\`\`Required Parameters : *email*, *first_name*, *last_name*
Example : \`!user create email=someone@maineiac.dev first_name=John last_name=Doe\`\n
`

    return obj;
}