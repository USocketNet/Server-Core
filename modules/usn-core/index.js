
// Prepare socketio core.
const socketio = require('./socketio');
module.exports.socketio = socketio;

// Prepare related libraries.
const libraries = require('usn-libs');
module.exports.redis = libraries.redis;

// Include utils in the core.
const utils = require('usn-utils');
module.exports.debug = utils.debug;

// Include the syntry mode.
const syntry = require('./adapter/syntry');
module.exports.syntry = syntry.init();