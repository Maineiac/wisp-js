/*
    Repo | wisp-js : https://github.com/Maineiac/wisp-js

    request.js

    Written by Maineiac
    http://maineiac.dev
*/
const config = require('../config.js');
const errors = require('./error.js').type;
const util = require('util');

const instance = require('axios').create({

    /*  This is all information that is used to make get/post resquests
        from/to the WISP API. The documentation can be found here :
            https://docs.panel.gg/#introduction
        This configures axios one time to use the information to make requests.
    */
    baseURL: `${config.PanelURL}api/client/servers/`,
    timeout: 5000,
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
        result = response;
    })
    .catch(function (error) {
        var code = error.code || error.response.status;
        err = new Error("Handling error");
        err.code = errors[code][0];
        err.msg = errors[code][1]; 
        throw err;
    });
    return result;
}

exports.post = async function(url, data) {
    var result;
    await instance.post(url, data)
    .then((response) => {
        result = response;
    }).catch(function (error) {
        var code = error.code || error.response.status;
        err = new Error("Handling error");
        err.code = errors[code][0];
        err.msg = errors[code][1]; 
        throw err;
    });
    return result;
}
