
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
 *  ABOUT THE PACKAGE: Focused on providing time common functions
 *  that gives the developer an easy access to basics and most used 
 *  data processing and any related programming logics.
*/

//Includes NodeJS process event handler.
const refsProcs = require('./process');

//Debuging or Logging class.
const refdebug = require('./debug');

//JSON Processing class.
const refjson = require('./json');

//Global Configurations handler.
const refconfig = require('./config');

module.exports = {
    procs: refsProcs.init(),
    json: refjson.init(),
    debug: refdebug.init(),
    config: refconfig.init(),
};
