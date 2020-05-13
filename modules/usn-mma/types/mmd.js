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

const shortid = require('shortid');
const config = require('usn-utils').config;
const redis = require('usn-libs').redis.init(config.redis())
    redis.select(1);

class usn_mmd {

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
            var matchInfo = await this.queue.push(user);
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

        let matching = () => {

            //Initialize match object structure.
            var matchobj = { 
                mtid: shortid.generate(),
                users: [],
                capacity: this.config.trigger,
                timestamp: new Date().toLocaleString()
            };

            var iteration = 0;

            while ( (this.queue.counts() >= this.config.trigger) && (iteration < (this.config.trigger * this.config.frequency)) ) {

                //Remove and Return user object.
                var curUser = {}; //from redis last row.

                //if user passed.
                if(true) {
                    matchobj.users.push(curUser);
                }


                for (var i = 0; i<count; i++) {

                    for (var j = i+1; j < count; j++) {
                        var policyvalue = this.policy( this.queue[i], this.queue[j] );

                        if (policyvalue >= this.prefs.threshold) {
                            matchobj.match = true; 
                            matchobj.idx = [i,j];
                            break;
                        }
                    } 
                    if (matchobj.match) 
                        break;

                }

                if (matchobj.match) {
                    ////var a = this.queue.splice(matchobj.idx[0],1).pop();
                    ////var b = this.queue.splice(matchobj.idx[1]-1,1).pop();

                    //Send the match info to all picked user.
                    //sio.to('sid').broadcast.emit('match-found', () => { JOIN or CANCEL } )
                }

                iteration++;
            }
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
    return new usn_mmd();
}