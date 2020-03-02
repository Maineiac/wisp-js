const config = require('./config.js');
const util = require('util');

function formatErr(e) {
    var array;
    switch(e) {
        case 400:
            array = ['400: Bad Request', 'Invalid request. Did you modify sometihng other than the config?'];
        break;
        case 401:
            array = ['401: Unauthorized', 'The configured API key is missing or invalid'];
        break;
        case 403:
            array = ['403: Forbidden', 'The API key does not have permission to interact with this server. Probably a misconfiguration.'];
        break;
        case 404:
            array = ['404 Not Found', 'This server was either suspended or misconfigured when setting up the bot.'];
        break;
        case 405:
            array = ['405 Method Not Allowed', 'An invalid request was made. Did you modify something other than the config?'];
        break;
        case 412:
            array = ['412 Precondition Failed', 'This server is unable to perform this action. It\'s probably down.'];
        break;
        case 422:
            array = ['422 Unprocessable Entity', 'There was a problem with a post request. This is likely Maineiac\s fault.'];
        break;
        case 429:
            array = ['429 Too Many Requests', 'Your bot has tried to use the api too many times recently, it has been temporarily rate limited'];
        break;
        case 500:
            array = ['500 Internal Server Error', 'WISP has had a problem. Contact WISP Support.'];
        break;
        case 503:
            array = ['503 Service Unavailable', 'WISP is temporarily offline for maintenance, try again later.'];
        break;
        case 504:
            array = ['504 DaemonConnectionException', 'The daemon isn\'t responding. Contact WISP Support'];
        break;
        default:
            array = ['Unknown error', 'Something really bad probably happened...'];
        break;
    }
    return array;
}

const instance = require('axios').create({

    /*  This is all information that is used to make get/post resquests
        from/to the WISP API. The documentation can be found here :
            https://docs.panel.gg/#introduction
        This configures axios one time to use the information to make requests.
    */
    baseURL: `${config.PanelURL}api/client/servers/`,
    timeout: 1000,
    headers: {

        'Content-Type': 'application/json',
        'Accept': 'application/vnd.wisp.v1+json',
        'Authorization': `Bearer ${config.WISPAPIKey}`

    }

});

exports.get = async function(url) {
    var result;
    await instance.get(url)
    .then(function (response) { // Successfully received a response.
        return response;
    })
    .catch(function (error) {
        var array = formatErr(error.response.status);
        err = new Error("Encountered error");
        err.code = array[0];
        err.msg = array[1];
        throw err;
    });
    return result;
}

exports.post = async function(url, data) {
    var result;
    await instance.post(url, data)
        .then((response) => {
            return response;
        }).catch(function (error) {
            var array = formatErr(error.response.status);
            err = new Error("Encountered error");
            err.code = array[0];
            err.msg = array[1];
            throw err;
      });
}
