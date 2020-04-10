const config = require( '../../config.js' );
const NodeCache = require( "node-cache" );
const cache = new NodeCache();

const instance = require( 'axios' ).create({

    /*  This is all information that is used to make get/post resquests
        from/to the WISP API. The documentation can be found here :
            https://docs.panel.gg/#introduction
        This configures axios one time to use the information to make requests.
    */
    baseURL: `${ config.PanelURL }api/application`,
    timeout: 5000,
    headers: {

        'Content-Type': 'application/json',
        'Accept': 'application/vnd.wisp.v1+json',
        'Authorization': `Bearer ${ config.WISPACPAPIKey }`,
        'User-Agent': 'WISP-JS Discord Bot | Admin'

    }
});

// Wrap axios.get while caching data
exports.get = async function(url) {

    const data = await cache.get( "wispjs_" + url ); // get cached data

    if( data == undefined ) { // then check if it exists

        const response = await instance.get( url );
        cache.set( "wispjs_" + url, response.data, config.cacheTimer );
        if(config.debug) {
            console.log( "Cache : `wispjs_" + url + "` was set." );
        }
        return response.data;

    } else {
        if(config.debug) {
            console.log( "Cache : `wispjs_" + url + "` was found." );
        }
        return data;

    }
}

exports.post = async function(url, data) {
    const response = await instance.post(url, data);
    return response;
    
}