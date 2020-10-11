
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
 *  ABOUT THE PACKAGE: This will include libraries that is required
 *      USocketNet core. This includes third-party package used in
 *      communicating with other server and databases in any kind.
*/

//Reference usn_restapi class.
const restapi = require('./restapi');

//Reference usn_redis class.
const redis = require('./redis');

//prepare express.
const express = require('./express');

module.exports = {
    restapi: restapi,
    redis: redis,
    express: express,
};
