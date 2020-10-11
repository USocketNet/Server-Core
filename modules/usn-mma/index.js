
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

//Just for demo.
const mmd = require('./types/mmd');

//Problem: Race condition.
const mmr = require('./types/mmr');

//Problem: Race condition.
const mmc = require('./types/mmc');

module.exports = {
  demo: mmd.init(),
  rank: mmr.init(),
  cond: mmc.init()
}