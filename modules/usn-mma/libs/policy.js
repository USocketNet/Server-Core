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

class usn_mmr_policy {

    constructor (config) {
        this.config = config;
    }

    check (prevAvg, curQueue) {

        //prevAvg = { pjid, avgRank, minPass, maxPass } 
        //curQueue = { wpid, pjid, curRank }
    
        //if not same project return false.
        if(prevAvg.pjid != curQueue.pjid) {
            return 0;
        }
    
        //check if this avg and curQueue and push to result.
        //percent of cur to min-50% and max 150%
        let result = 75; //no rating now just pass.
    
        //check is rate calculated passed or not.
        return result >= this.config.passing ? true : false;
    };

}


module.exports.init = (config) => {
    return new usn_mmr_policy(config);
}