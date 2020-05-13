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

class usn_mmr_accord {

    /**
     * Initialize accord class of mmr just by passing active redis client.
     * @param  {} redisClient
     */
    constructor(redisClient) {
        this.redis = redisClient;
    }

    /**
     * Pass your project id and it will return available match:wait from this project id.
     * Return: array of match:wait:pjid:* keys with different matchid suffix or ZERO. 
     * Example: match:wait:pjid:Ua7hJQ1 -> generated by shortid.
     * @param  {} pjid
     */
    matchOnWait = async (pjid) => {        
        return new Promise( async (resolve, reject) => {

            await this.redis.database.keys('*match:wait:'+pjid+':*', (err, waitMatch) => {
                if(!err) {
                    if(waitMatch.length > 0) {
                        //console.log("FOUND WAITING MATCHES: " + waitMatch.length);
                        resolve(waitMatch); //Array
                    } else {
                        resolve(false);
                    }
                    
                } else {
                    reject('Error on Getting match on WAIT.');
                }
            })
            
        })
    }

    //ONGOING!
    findMatchOnWait = async (curUser, waitMatchList) => {
        return new Promise( async (resolve, reject) => {

            if(waitMatchList.length > 0) {
                //LOOP FIND A MATCH APPLYING POLICY FILTERING.
                for await (var match of waitMatchList){

                    console.log('WATING MATCH: ' + match);

                    //CHECK FROM EACH OF THIS MATCH IF POLICY IS MEET.
                    var matchInfo = {}; //TEST
                    var foundMatch = false; //TEST

                    if(foundMatch) {
                        resolve(matchInfo)
                    } else {
                        resolve(false)
                    }
                }
            } else {
                resolve(false);
            }
            
        })
    }
    

    setUserOnMatch = async (curUser) => {
        return new Promise( async (resolve, reject) => {

            var macthUser = { [curUser.wpid]: JSON.stringify(curUser) };
            await this.redis.database.hset('match:users', macthUser, (err, res) => {
                if(!err) {
                    console.log("CREATED USER ON MATCHING: " + res);
                    resolve(res); //match id
                } else {
                    reject('Error on CREATING match on WAIT.');
                }
            })
            
        })
    }
    
    /**
     * Create a match based on the project preference of pjid.
     * @param  {} curUser
     */
    createMatch = async (curUser) => {        
        return new Promise( async (resolve, reject) => {

            var matchKey = 'match:wait:'+curUser.pjid+':'+shortid.generate();
            var joinUser = { [curUser.wpid]: JSON.stringify(curUser) };

            await this.redis.database.hset(matchKey, joinUser, (err, res) => {
                if(!err) {
                    //console.log("CREATED WAITING MATCH: " + res);
                    resolve(matchKey); //match id
                } else {
                    reject('Error on CREATING match on WAIT.');
                }
            })

        })
    }
}

module.exports.init = (redisClient) => {
    return new usn_mmr_accord(redisClient);
}