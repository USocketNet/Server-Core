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
            console.log(err);
        }
    }

    start = async () => {
        if (typeof this.config === 'undefined') {
            console.log("Config is not set! Cannot start");
            return; //Cancel execution.
        }

        let test = () => {

            //DESIGN 1
            //1. if count is greater than 0.
            //      then make a while and continue iterate.
            //2. Initialize match object structure.
            //3. REMOVE and RETURN oldest.
            //4. FIND this user a match with same rank if nothing found return to redis.
            //5. if user passed the policy, add this user to matchobj on redis 
            //      if user CONFIRM and NOTIFY other user in this match obj, 
            //      or if CANCEL, do nothing. dont return this to queue 
            //      let user ask for a match again.
            //6. if this match from redis is completed, pull from wait to ready. 
            //      else dont do anything from that redis match:wait;
            //7. if complete call match make function and pass this match info.

            //Initialize match object structure.
            // var matchobj = { 
            //     mtid: shortid.generate(),
            //     users: [],
            //     capacity: this.config.trigger,
            //     timestamp: new Date().toLocaleString()
            // };

            // var iteration = 0;

            // while ( (this.queue.counts() >= this.config.trigger) && (iteration < (this.config.trigger * this.config.frequency)) ) {

            //     //Remove and Return user object.
            //     var curUser = {}; //from redis last row.


            //     //if user passed.
            //     if(true) {
            //         matchobj.users.push(curUser);
            //     }


            //     for (var i = 0; i<count; i++) {

            //         for (var j = i+1; j < count; j++) {
            //             var policyvalue = this.policy( this.queue[i], this.queue[j] );

            //             if (policyvalue >= this.prefs.threshold) {
            //                 matchobj.match = true; 
            //                 matchobj.idx = [i,j];
            //                 break;
            //             }
            //         } 
            //         if (matchobj.match) 
            //             break;

            //     }

            //     if (matchobj.match) {
            //         ////var a = this.queue.splice(matchobj.idx[0],1).pop();
            //         ////var b = this.queue.splice(matchobj.idx[1]-1,1).pop();

            //         //Send the match info to all picked user.
            //         //sio.to('sid').broadcast.emit('match-found', () => { JOIN or CANCEL } )
            //     }

            //     iteration++;
            // }
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