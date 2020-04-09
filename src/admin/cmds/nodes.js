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
        case 'allocation':
            switch(args[2]) {
            case 'list':
                
                return planned;
            case 'create':
                
                return planned;
            case 'delete':

                return planned;
            }
        break;
        default:
            return "Invalid sub command";
    }
}