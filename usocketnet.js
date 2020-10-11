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

const usn = require('usn-utils');
const argv = require('minimist')(process.argv.slice(2));

if( typeof argv.master === 'undefined' || typeof argv.message === 'undefined' || typeof argv.match === 'undefined' || typeof argv.game === 'undefined' ) {
    usn.debug.log('USocketNet-Check-Error', 'Detected no arument for --master, --message, --match, and --game.', 'red', 'usocketnet');
    process.exit(1);
} else {
    usn.debug.log('USocketNet-Check-Success', 'Executing the required server core for: ' + argv.name, 'green', 'usocketnet');
    require('./modules/master');
    require('./modules/message');
    require('./modules/match');
    require('./modules/game');
}