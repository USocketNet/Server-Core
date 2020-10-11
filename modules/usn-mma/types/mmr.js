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

const config = require('usn-utils').config;
const redis = require('usn-libs').redis.init(config.redis())
    redis.select(1);

class usn_mmr {

    constructor() {

        //Config Container.
        this.config = { 
            //Check queue interval.
            interval: 1000,
            //Lower and Higher Percent to pass.
            passing: 0.4,
            //Total matching per interval
            frequency: 5,
            //Number of queue to match start.
            trigger: 4
        };

        //USER QUEING MODULE.
        this.queue = require('../libs/queue')
            .init(redis);

        this.accord = require('../libs/accord')
            .init(redis);

        //MATCH FILTERING MODULE.
        this.policy = require('../libs/policy')
            .init(this.config);

        //TIMER INSTANCE CONTAINER.
        this.timerInstance = undefined;
    }

    async addQueue(user, cback) {
        try {
            var matchInfo = await this.queue.add(user);
            cback(matchInfo);
        } catch (err) {
            cback(false);
            console.log('Add User Queue Error: ' + err);
        }
    }

    start = async () => {
        if (typeof this.config === 'undefined') {
            console.log("Config is not set! Cannot start");
            return; //Cancel execution.
        }

        let matching = async () => {

            //START: FOR LOOP ON PROJECTS.
            let curPrjId = '0';
            
            //GET THE TOTAL LIST OF QUEUING USERS.
            var counts = await this.queue.counts(curPrjId);
            
            while(counts > 0) {

                try {
                    //GET THE USER AND WAIT UNTIL RETURN.
                    var curUser = await this.queue.getLast(curPrjId);
                    console.log('Logging: ' + JSON.stringify(curUser));

                    //MAKE A HASH FOR THIS USER WHICH IS ON MATCH MAKING.
                    if( await this.queue.isWaiting(curUser.wpid) != true ) {

                        //FIRST CHECK IF THERE IS A WAITING MATCH.
                        var waitMatchList = await this.accord.matchOnWait(curPrjId);

                        //CHECK IF MATCH IS FOUND THEN SET OR NOT & RETURN FALSE.
                        var foundMatch = await this.accord.findMatchOnWait(curUser, waitMatchList);

                        if( !foundMatch ) {
                            //CREATE A NEW MATCH FROM PROJECT PREFS.                            
                            var matchKey = await this.accord.createMatch(curUser); //return match key
                            
                            if(matchKey) {
                                //FIND USER WITH WPID AND ADD THIS match = object.
                                var jUser = await this.queue.getUser(curUser.wpid);
                                    jUser.mkey = matchKey;

                                var uUser = await this.queue.setUser(jUser);
                            }
                        }
                        
                    }

                } catch (err) {
                    console.log('Error: ' + err);
                }

                //UPDATE THE COUNT SINCE LAST USER POP.
                counts = await this.queue.counts(curPrjId);
            }

            //END: FOR LOOP ON PROJECTS.
        }

        this.timerInstance = setInterval(
            matching.bind(this),
            this.config.interval
        );
    }

    stop() {
        clearInterval(this.timerInstance);
    }

}

module.exports.init = () => {
    return new usn_mmr();
}