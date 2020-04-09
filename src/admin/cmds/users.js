module.exports = async function(args) {
    const planned = "This is planned but not implemented";
    switch(args[1]) {
        case 'list':
            return planned;
        case 'get':
            return planned;
        case 'create':
            return planned;
        case 'edit':
            return planned;
        case 'delete':
            return planned;
        default:
            return "Invalid sub command";
    }
}