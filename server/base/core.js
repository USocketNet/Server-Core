
// This script will be usable to all types of server.
// Add modules that should be shared only.

//Contains server options in running server.
const config = {};
    config.package = require('../../package.json');
    config.server = require('../config/server.json');
    config.master = require('../config/master.json');
    config.chat = require('../config/chat.json');
    config.game = require('../config/game.json');
    exports.config = config;

    //console.log(config);

//Listens for Process unexpected errors and do something about it.
if( config.server.production ) {
    require('./process');
}

exports.configof = function(servertype) {
    if(servertype == 'master') {
        return config.master;
    } else if (servertype == 'chat') {
        return config.chat;
    } else if (servertype == 'game') {
        return config.game;
    } else {
        return null;
    }
}

//Require logging via console and file.
const debug = require('./debug');
    exports.debug = debug();

//Declare and initialized http as our rest api instance.
const restapi = require('./restapi')( config.server.wpress.host );
    exports.restapi = restapi;

//Declare and initialized redis instance per server type.
const redis = require('./redis')( config.server.redis );
    redis.ping(); //Check redis-server else exit.
    exports.redis = redis;