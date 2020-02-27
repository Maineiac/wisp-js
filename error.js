exports.get = function(error) {
    var array;
    switch(error) {
        case '400':
            return ['400: Bad Request', 'Invalid request. Did you modify sometihng other than the config?'];
        break;
        case '401':
            return ['401: Unauthorized', 'The configured API key is missing or invalid'];
        break;
        case '403':
            return ['403: Forbidden', 'The API key does not have permission to interact with this server. Probably misconfiguration.'];
        break;
        case '404':
            return ['404 Not Found', 'This server was either suspended or misconfigured when setting up the bot.'];
        break;
        case '405':
            return ['405 Method Not Allowed', 'An invalid request was made. Did you modify something other than the config?'];
        break;
        case '412':
            return ['412 Precondition Failed', 'This server is unable to perform this action. It\'s probably down.'];
        break;
        case '429':
            return ['429 Too Many Requests', 'Your bot has tried to use the api too many times recently, it has been temporarily rate limited'];
        break;
        case '500':
            return ['500 Internal Server Error', 'WISP has had a problem. Contact WISP Support.'];
        break;
        case '503':
            return ['503 Service Unavailable', 'WISP is temporarily offline for maintenance, try again later.'];
        break;
        case '504':
            return ['504 DaemonConnectionException', 'The daemon isn\'t responding. Contact WISP Support'];
        break;
        default:
            return ['Unknown error', 'Something really bad probably happened...']
        break;
    }
}
