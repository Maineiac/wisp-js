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
        case 'suspend':
            return planned;
        case 'unsuspend':
            return planned;
        case 'reinstall':
            return planned;
        case 'rebuild':
            return planned;
        case 'force-delete':
            return planned;
        case 'update':
            switch(args[2]) {
            case 'details':
                return planned;
            case 'build':
                return planned;
            case 'startup':
                return planned;
            }
        break;
        case 'database':
            switch(args[2]) {
            case 'list':
                return planned;
            case 'get':
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