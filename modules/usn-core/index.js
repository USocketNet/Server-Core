
/*
    * Package: USocketNet
    * Description: Self-Host Realtime Multiplayer Server 
    *       for your Game or Chat Application.
    * Package-Website: https://usocketnet.bytescrafter.net
    * 
    * Author: Bytes Crafter
    * Author-Website:: https://www.bytescrafter.net/about-us
    * License: Copyright (C) Bytes Crafter - All rights Reserved. 
*/

/* 
 *  ABOUT THE PACKAGE: The package include mainly the core of 
 *      USocketNet like match making and character synchronization.
*/

// Prepare socketio core.
const socketio = require('./socketio');

// Prepare related libraries.
const libraries = require('usn-libs');

// Include utils in the core.
const utils = require('usn-utils');

// Include the syntry mode.
const syntry = require('./adapter/syntry');

// Include usn_pm2 for process management.
const cluster = require('./cluster/pm2');

module.exports = {
    socketio: socketio,
    redis: libraries.redis,
    debug: utils.debug,
    syntry: syntry.init(),
    cluster: cluster.init()
};