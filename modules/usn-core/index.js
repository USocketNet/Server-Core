
/*
    * Package: USocketNet
    * Description: Multipurpose Realtime Server for your 
    *   Multiplayer Game, Chat App, or Delivery App.
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

// Include utils in the core.
const utils = require('usn-utils');

// Include the syntry mode.
const syntry = require('./adapter/syntry');

// Include usn_pm2 for process management.
const cluster = require('./cluster/pm2');

module.exports = {
    socketio: socketio,
    debug: utils.debug,
    syntry: syntry.init(),
    cluster: cluster.init()
};