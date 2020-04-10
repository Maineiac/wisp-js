
module.exports = async function(args) {
    const planned = "This is planned but not implemented";
    switch(args[1]) {
        case 'list':
            data = await require('./nodes/list')();
            return data;
        case 'get':
            return planned;
        case 'create':
            data = await require('./nodes/create')();
            return data;
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