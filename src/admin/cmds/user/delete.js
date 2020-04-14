
const request = require('../../request');
const config = require('../../../../config');
const errors = require('../../error');
const util = require('../../../util.js');
const _ = require('underscore');
const table = require('text-table');

module.exports = async function(args) {
    let obj = util.baseEmbedObj('servers', "User Editor");

    const ids = args[2].split(`,`);

    for(const id of ids) {

        try {
            //await request.delete(`/users/${id}`);
            //obj.desc = `${obj.desc}\nDeleted user #${id}`;
            obj.desc = "Disabled until permissions are setup";N

        } catch(error) {
            return errors(error, 'admin/user/delete.js : line 25');

        }
    }
    
    return obj;
}