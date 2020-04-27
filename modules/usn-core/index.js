
//Prepare socketio core.
const socketio = require('./socketio');
module.exports.socketio = socketio;

//Prepare related libraries.
module.exports.libs = socketio.libs;

//Include utils in the core.
const utils = require('usn-utils');
module.exports.utils = utils;

//Include the syntry mode.
const syntry = require('./adapter/syntry');
module.exports.syntry = syntry.init();