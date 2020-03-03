/*
    Repo | wisp-js : https://github.com/Maineiac/wisp-js

    util.js

    Written by Maineiac
    http://maineiac.dev
*/

// A function to format seconds to hours, minutes, seconds.
exports.formatTime = function(seconds) {
    var r,s;
    var time = Math.floor(seconds);
    var timestr = `${time}s`;
    if (time >= 60) {
      r = time%60;
      time = Math.floor(time / 60);
      timestr = `${time}m ${r}s`;
    }
    if (time >= 60) {
      s = r;
      r = time%60;
      time = Math.floor(time / 60);
      timestr = `${time}h ${r}m ${s}s`;
    }
    return timestr;
}

// This is just an object holding information about common errors.
exports.errors = {
    400: [
        '400 Bad Request', 
        'Invalid request. Did you modify sometihng other than the config?'
    ],
    401: [
        '401 Unauthorized', 
        'The configured API key is missing or invalid'
    ],
    403: [
        '403 Forbidden', 
        'The API key does not have permission to interact with this server. Probably a misconfiguration.'
    ],
    404: [
        '404 Not Found', 
        'This server was either suspended or misconfigured when setting up the bot.'
    ],
    405: [
        '405 Method Not Allowed', 
        'An invalid request was made. Did you modify something other than the config?'
    ],
    412: [
        '412 Precondition Failed', 
        'This server is unable to perform this action. It\'s probably down.'
    ],
    422: [
        '422 Unprocessable Entity', 
        'There was a problem with a post request. This is likely Maineiac\s fault.'
    ],
    429: [
        '429 Too Many Requests', 
        'Your bot has tried to use the api too many times recently, it has been temporarily rate limited'
    ],
    500: [
        '500 Internal Server Error', 
        'WISP has had a problem.'
    ],
    503: [
        '503 Service Unavailable', 
        'WISP is temporarily offline for maintenance, try again later.'
    ],
    504: [
        '504 DaemonConnectionException', 
        'The daemon isn\'t responding. This can happen if a server has been suspended/unpaid.'
    ],
    ECONNABORTED: [
        'Timed out', 
        'It appears this bot is running on a potato, or WISP died.'
    ]
}