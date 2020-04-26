
// This script will be usable to all types of server.
// Add modules that should be shared only.

//Contains server options in running server.
const usn = require('usn-utils');

    //console.log(config);

//Listens for Process unexpected errors and do something about it.
if( usn.config.safe('production', false) === true ) {
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

//Declare and initialized redis instance per server type.
const redis = require('./redis')( config.server.redis );
    redis.ping(); //Check redis-server else exit.
    exports.redis = redis;