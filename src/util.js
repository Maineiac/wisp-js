const config = require('../config');
const _ = require('underscore');

module.exports.parseParamsWithQuotes = function(args) {

    let params = args.match(/[^\s"']+|"([^"]*)"/gmi);
    
    for(i = 0; i < params.length; i++){

        if(params[i] != null && 
            params[i+1] != null && 
            params[i].charAt(params[i].length - 1) == "=") {

            //Move strings wrapped in "" to the correct key
            if(params[i+1].startsWith('"') || params[i+1].startsWith("'")) {
                params[i] = `${params[i]}${params[i+1]}`; // Looking for better ways to do this
                params[i+1] = null; // After a bunch of checks, this magic reformats our array
            
            }

        }

    }
    return params;
}

module.exports.parseRawParams = function(params, base=false) {

    let newParams = (base) ? base : {};

    for(const p of params) {

        let arr = p.split("=");
        let value = arr[1].replace(/"/g, '');
        value = value.replace(/'/g, '');

        if(value == "true") {
            value = true;
        } else if(value == "false") {
            value = false;
        } else if(!value) {
            value = "none";
        }

        newParams[arr[0]] =  value;

    }

    if(newParams.ports) {
        newParams.ports = newParams.ports.split(`,`);
    }

    return newParams;
}

module.exports.arrayBooleansToStrings = function(array) {
    let parsed = [];

    for(const p in array) {

        parsed[p] = [

            array[p][0],
            (_.isBoolean(array[p][1])) ? array[p][1].toString() : 
            (!array[p][1]) ? "none" : array[p][1]

        ]

    }

    return parsed;

}

module.exports.baseEmbedObj = function(type, title) {
    const obj = {
        title: {
            text: title,
            icon: config.embeds[type].icon
        },
        color: config.embeds[type].color,
        desc: "",
        footer: {
            text: config.embeds.footer.text,
            icon: config.embeds.footer.icon
        }
    };
    return obj;
}