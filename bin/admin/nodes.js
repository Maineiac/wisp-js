const request = require('../request.js');
exports.list = async function() {
    var result;
    await request.get(`application/nodes`, false)
    .then(function (response) { // If we got a response we send a success embed
        //console.log(response.data)
        result = response.data.data;

    }).catch((error) => { // Otherwise we send an error embed
        console.log(error)
        throw error;

    });
    return result;
}