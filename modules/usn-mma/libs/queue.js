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

class usn_mmr_queue {

    /**
     * Initialize queuing class of mmr just by passing active redis client.
     * @param  {} redisClient
     */
    constructor(redisClient) {
        this.redis = redisClient;
    }

    add = async (curUser) => {
        
        return new Promise( async (resolve, reject) => {

            var userStr = JSON.stringify(curUser); //convert to string.
            //console.log("EXISTING: " + await this.exist(curUser.wpid));

            //CHECK IF USER IS ON MATCH MAKING OR ACTIVE IN MATCH.
            await this.redis.database.lpush('match:queue:'+curUser.pjid, [userStr], async (err, res) => {
                if(!err) {
                    //console.log('User request to be queue: ' + res); //return N of success.

                    resolve(true);
                    
                } else {
                    reject('Failed to push this user to queuing.');
                }
            });
                
        })

    }

    
    /**
     * Add this user to the topmost list of queuing users.
     * @param  {} user
     */
    add = async (curUser) => {
        
        return new Promise( async (resolve, reject) => {

            var userStr = JSON.stringify(curUser); //convert to string.
            //console.log("EXISTING: " + await this.exist(curUser.wpid));

            //CHECK IF USER IS ON MATCH MAKING OR ACTIVE IN MATCH.
            if( await this.isWaiting(curUser.wpid) == false ) {
                //push user to redis queing list.
                await this.redis.database.lpush('match:queue:'+curUser.pjid, [userStr], async (err, res) => {
                    if(!err) {
                        //console.log('User request to be queue: ' + res); //return N of success.
    
                        var joiningUser = { [curUser.wpid]: userStr };
                        await this.redis.database.hset('match:users', joiningUser, (err, res) => {
                            if(!err) {
                                //console.log("CREATED USER ON MATCHING: " + res);
                                resolve(true);
                            } else {
                                reject(false);
                            }
                        })
                        
                    } else {
                        reject('Failed to push this user to queuing.');
                    }
                });
            } else {
                var gUser = await this.getUser(curUser.wpid);
                resolve( gUser.mkey ); //return to this request that already on macthing.
            }
                
        })

    }

    //NOT YET IMPLEMENTED!
    remove = async (wpid) => {
        //CHECK IF USER IS EXISTING ON MACTH OR ACTIVE.
        return new Promise( async (resolve, reject) => {

            resolve(true); //DUMMY
                
        })
    }

    /**
     * Check the user with this wpid if it is currently on match waiting or even on 
     * active match. This is to prevent user from having multiple match request.
     * Return: boolean of false if not found but an object of match info if found!
     * @param  {} wpid
     */
    isWaiting = async (wpid) => {
        return new Promise( async (resolve, reject) => {

            //GET THE INSTANCE OF THIS USER ON OUR RECORD IF USER IS ALREADY WAITING OR ON ACTIVE MATCH. 
            await this.redis.database.hget('match:users', wpid, (err, matchUser) => {
                if(!err) {
                    
                    if(matchUser != null) {
                        var mUser = JSON.parse(matchUser);
                        if(typeof mUser.mkey != 'undefined') {
                            console.log("USER ON MATCH: " + mUser.mkey );
                            resolve(mUser.mkey); //OBJECT
                        } else {
                            console.log("USER NOT ON MATCH" );
                            resolve( false );
                        }
                    } else {
                        console.log("USER NOT FOUND" );
                        resolve( false );
                    }

                } else {
                    reject('Error on Getting user on matching system.');
                }

            })
                
        })
    }

    /**
     * Set or Update user on matching system.
     * @param  {} curUser
     */
    setUser = async (curUser) => {
        return new Promise( async (resolve, reject) => {

            var updateUser = { [curUser.wpid]: JSON.stringify(curUser) };
            await this.redis.database.hset('match:users', updateUser, (err, res) => {
                if(!err) {
                    resolve(true);
                } else {
                    reject(false);
                }
            })
                
        })
    }

    /**
     * Get user on matching system by wpid.
     * @param  {} curUser
     */
    getUser = async (wpid) => {
        return new Promise( async (resolve, reject) => {

            await this.redis.database.hget('match:users', wpid, (err, user) => {
                if(!err) {
                    
                    if(user != null) {
                        var thisUser = JSON.parse(user);
                        resolve(thisUser); //OBJECT
                    } else {
                        resolve(false);
                    }

                } else {
                    reject('Error on Getting user on matching system.');
                }

            })
                
        })
    }

    /**
     * Check if this user with this wpid is already on macthing system.
     * Either user is on the waiting list or even on active match.
     * Return: true if user exist and false if not.
     * @param  {} wpid
     */
    exist = async (wpid) => {
        return new Promise( async (resolve, reject) => {

            await this.redis.database.hexists('match:users', wpid, (err, userExist) => {
                if(!err) {
                    //console.log("FOUND USER ON MATCH: " + userExist );
                    resolve(userExist); //boolean response.
                } else {
                    reject('Error on Getting user on matching system.');
                }

            })
                
        })
    }

    /**
     * Get the laast queuing user and also parse value into json.
     * @param  {} pjid
     */
    getLast = async (pjid) => {
        return new Promise( async (resolve, reject) => {

            await this.redis.database.rpop('match:queue:'+pjid, (err, user) => {
                if(!err) {
                    //console.log( 'LAST USER: ' + JSON.stringify(user) );
                    resolve( JSON.parse(user) );
                } else {
                    reject('Error on Get Last User on Queue.');
                }
            })
            
        })
    }

    /**
     * Get the total number of user on queing for a match creation.
     * Return: typpeof number and can be zero.
     * @param  {} pjid
     */
    counts = async (pjid) => {        
        return new Promise( async (resolve, reject) => {

            await this.redis.database.llen('match:queue:'+pjid, (err, total) => {
                if(!err) {
                    //console.log('Total user in Queue: ' + total);
                    resolve(total);
                } else {
                    reject('Error on Get Count of User on Queue.');
                }
            })
            
        })
    }
}

module.exports.init = (redisClient) => {
    return new usn_mmr_queue(redisClient);
}