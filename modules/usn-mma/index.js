
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

//Just for demo.
const mmd = require('./types/mmd');

//Problem: Race condition.
const mmr = require('./types/mmr');

module.exports = {
  demo: mmd.init(),
  rank: mmr.init()
}