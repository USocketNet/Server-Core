
// This script will be usable to all types of server.
// Add modules that should be shared only.

//Includes clustering library to take advantage of cpu count.
//const cluster = require('cluster');
//    exports.cluster = cluster;

//Access current system information such as os, cpu, ram, etc.
const system = require('os');
    exports.system = system;

//Contains server options in running server.
var config = {};
    config.package = require('../package.json');
    config.admin = require('../config/admin.json');
    config.master = require('../config/master.json');
    config.chat = require('../config/chat.json');
    config.game = require('../config/game.json');
    exports.config = config;

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
const debug = require('./controllers/debug');
    exports.debug = debug;

//Optional for simple and complex hashing.
const cipher = require('./controllers/cipher');
    exports.cipher = cipher;

//Declare and initialized http as our rest api instance.
const restapi = require('./controllers/restapi');
    exports.restapi = restapi;

    console.log(config.admin.mysql);
//Declare and initialized mysql instance per server type.
const mysql = require('./controllers/mysql')( config.admin.mysql );
    exports.mysql = mysql;

//Declare and initialized redis instance per server type.
var redis = require('./controllers/redis')( this );
    redis.ping(); //Check redis-server else exit.

//Filter unwanted process error info.
if( config.admin.production ) {
    require('./controllers/process')(debug);
}