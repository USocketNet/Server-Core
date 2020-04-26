
// This script will be usable to all types of server.
// Add modules that should be shared only.

//Contains server options in running server.
const config = {};
    config.package = require('../../package.json');
    config.server = require('../config/server.json');
    config.master = require('../config/master.json');
    config.message = require('../config/message.json');
    config.match = require('../config/match.json');
    exports.config = config;

    //console.log(config);

//Listens for Process unexpected errors and do something about it.
if( config.server.production ) {
    require('./process');
}

exports.configof = function(servertype) {
    if(servertype == 'master') {
        return config.master;
    } else if (servertype == 'message') {
        return config.message;
    } else if (servertype == 'match') {
        return config.match;
    } else {
        return null;
    }
}

//Declare and initialized http as our rest api instance.
const restapi = require('./restapi')( config.server.wpress.host );
    exports.restapi = restapi;

//Declare and initialized redis instance per server type.
const redis = require('./redis')( config.server.redis );
    redis.ping(); //Check redis-server else exit.
    exports.redis = redis;