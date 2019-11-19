// This script will be usable to all types of server.
// Add modules that should be shared only.

//Access current system information such as os, cpu, ram, etc.
const system = require('os');
    exports.system = system;

//Includes clustering library to take advantage of cpu count.
//const cluster = require('cluster');
//    exports.cluster = cluster;

//Contains the primary information of USocketNet.
const package = require('../package.json');
    exports.package = package;

//Contains server options in running server.
var config = {};
    config.admin = require('../config/admin.json');
    config.debug = require('../config/debug.json');
    config.master = require('../config/master.json');
    config.chat = require('../config/chat.json');
    config.game = require('../config/game.json');
    exports.config = config;

//Require logging via console and file.
const debug = require('./controllers/debug');
    exports.debug = debug;

//Optional for simple and complex hashing.
const cipher = require('./controllers/cipher');
    exports.cipher = cipher;

//Include this to debug server errors.
require('./controllers/process')(debug);