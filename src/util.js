const location_embeds = require(`${process.env.root}/config/embeds/location`);
const embeds = {
    location: require(`${process.env.root}/config/embeds/location`),
    nest: require(`${process.env.root}/config/embeds/nest`),
    node: require(`${process.env.root}/config/embeds/node`),
    server: require(`${process.env.root}/config/embeds/server`),
    user: require(`${process.env.root}/config/embeds/user`),
    shared: require(`${process.env.root}/config/embeds/shared`)
}
const _ = require('underscore');

module.exports.parseParamsWithQuotes = function(args) {

    let params = args.match(/[^\s"']+|"([^"]*)"/gmi);
    if(params) {
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
    return null;
}

module.exports.parseRawParams = function(params, base=false) {

    let newParams = (base) ? base : {};
    if(params) {
        for(const p of params) {
            let arr = p.split("=");
            let value = arr[1].replace(/"/g, '');
            value = value.replace(/'/g, '');

            if(value == "true") {
                value = true;
            } else if(value == "false") {
                value = false;
            } 

            let dot = arr[0].split(".")
            if(dot[1]) {
                newParams[dot[0]] = (newParams[dot[0]]) ? newParams[dot[0]] : {};
                newParams[dot[0]][dot[1]] = value;
            } else {
                newParams[arr[0]] =  value;
            }

        }
    }

    if(newParams.ports) {
        newParams.ports = newParams.ports.split(`,`);
    }
    return newParams;
}

module.exports.cleanArray = function(array) {
    let parsed = [];

    for(const p in array) {
        if(array[p] && array[p][0] != "STARTUP") {
            parsed[p] = [

                array[p][0],
                (_.isBoolean(array[p][1])) ? array[p][1].toString() : 
                (!array[p][1]) ? "none" : array[p][1]

            ]
        }


    }

    return parsed;

}

module.exports.baseEmbedObj = function(args) {
    let type;
    for(const a of args) {
        if(_.isObject(embeds[a])) {
            type = embeds[a]
        } else if (type && _.isObject(type[a])) {
            type = type[a];
        }
    }
    const obj = {
        title: {
            text: type.title,
            icon: type.icon
        },
        color: type.color,
        desc: "",
        footer: {
            text: embeds.shared.footer.text,
            icon: embeds.shared.footer.icon
        }
    };
    return obj;
}