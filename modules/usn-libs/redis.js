
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

//#region Helper function for redis script.
    //Make a default socket key.
    function getSockKey( wpid, stype ) {
        return 'user:' + wpid + ':' + stype.toLowerCase();
    }

    //Make a default user key.
    function getServKey( stype ) {
        return stype.toLowerCase() + ':user';
    }

    //Make a default user key.
    function getUserKey( wpid ) {
        return 'user:' + wpid;
    }
//#endregion

//Require usn-utils->all on global.
const utils = require('usn-utils');

class usn_redis {

    /**
     * During instantiation of usn_express class, a constructor is 
     * invoked which needs 1 parameter. Redis config in standard 
     * format: { host, port, password{if any} }.
     */
    constructor ( conf ) {
        //Get utils usn_debug class.
        this.debug = utils.debug;

        //Get utils usn_json class and clone config json object.
        this.config = utils.json.cloneJson( conf );

        //Require npm ioredis package.
        this.redis = require('ioredis');
    }

    /**
     * Create redis client and select target database.
     * @param  {} db
     */
    select( db ) {

        if( typeof this.config !== 'undefined') {
            let conf = this.config;
                conf.db = db;
            this.database = this.redis.createClient( conf );
        } else {
            this.debug.log('Redis-Server-Warning', 'Redis database selection was failed.', 'red', 'redis');
            process.exit(1);
        }
    }
    
    /**
     * Call this function and it will return if redis server is alive else false 
     * if the redis-server cant be reach or actually unreachable.
     */
    ping () {
        this.redis.createClient( this.config ).ping( (err, res) => {
            if( err ) {
                this.debug.log('Redis-Server-Error', 'Redis connection check return error.', 'red', 'redis');
                process.exit(1);
            } else {
                this.debug.log('Redis-Server-Success', 'Redis connection check was a success.', 'green', 'redis');
            }
        });
    }

    //TEMPORARY
    getUser( wpid, cback ) {
        if(this.database !== 'undefined') {
            this.database.hgetall( getUserKey(wpid), function (err, obj) {
                if( err ) {
                    cback( { status: 'error', info: 'Error finding user: ' + err } );
                } else {
                    if( utils.json.isObjectEmpty(obj) ) {
                        cback( { status: 'notfound' } );
                    } else {
                        cback( { status: 'success', data: obj } );
                    }
                }
            });
        } else {
            cback( { status: 'noredisdb' } );
            this.debug.log('Redis-Server-Warning', 'Redis database is not set yet.', 'yellow', 'redis');
        }
    }

    //TEMPORARY
    addUser( user, cback ) {
        if(this.database !== 'undefined') {
            this.database.hmset( getUserKey(user.wpid), user, function (err, res) {
                if( err ) {
                    cback( { status: 'error', info: 'Error add user to redis: ' + res } );
                } else {
                    cback( { status: 'success', info: 'Created information: ' + res } );
                }
            });
        } else {
            cback( { status: 'noredisdb' } );
            this.debug.log('Redis-Server-Warning', 'Redis database is not set yet.', 'yellow', 'redis');
        }
    }

    //TEMPORARY
    updateUser( user, cback ) {
        if(this.database !== 'undefined') {
            this.database.hmset( getUserKey(user.wpid), user, function (err, res) {
                if( err ) {
                    cback( { status: 'error', info: 'Error add user to redis: ' + res } );
                } else {
                    cback( { status: 'success', info: 'Updated information: ' + res } );
                }
            });
        } else {
            cback( { status: 'noredisdb' } );
            this.debug.log('Redis-Server-Warning', 'Redis database is not set yet.', 'yellow', 'redis');
        }
    }

    getUserSids( wpid, stype, cback ) {
        if(this.database !== 'undefined') {
            this.database.hkeys( getSockKey( wpid, stype ), function (err, obj) {
                if( err ) {
                    cback( { status: 'error', info: 'Error finding user: ' + err } );
                } else {
                    if( utils.json.isObjectEmpty(obj) ) {
                        cback( { status: 'notfound' } );
                    } else {
                        cback( { status: 'success', data: obj } );
                    }
                }
            });
        } else {
            cback( { status: 'noredisdb' } );
            this.debug.log('Redis-Server-Warning', 'Redis database is not set yet.', 'yellow', 'redis');
        }
    }
    
    /**
     * Must be called when USocketNet user is connected to any server.
     * This function insert user data to redis server. The socket param 
     * must be in { wpid: 1, sid: 'hash', nsp: 'master' } structure.
     * @param  {} socket
     * @param  {} cback
     */
    socketConnect ( socket, cback ) {
        if(this.database !== 'undefined') {

            // let serverCache = { [socket.id]: socket.wpid };
            // this.database.hset( getServKey( socket.stype ), serverCache, (err, res) => {
            //     if( err ) {
            //         cback( { status: 'failed', data: null } );
            //     }
            // });

            let userCache = { [socket.id]: new Date().toLocaleString() };
            this.database.hset( getSockKey( socket.wpid, socket.stype ), userCache, (err, res) => {
                if( err ) {
                    cback( { status: 'failed', data: null } );
                }
            });
        } else {
            cback( { status: 'noredisdb' } );
            this.debug.log('Redis-Server-Warning', 'Redis database is not set yet.', 'yellow', 'redis');
        }
    }

    /**
     * Must be called when USocketNet user is disconnected to any server.
     * This function delete user data to redis server. The socket param 
     * must be in { wpid: 1, sid: 'hash', nsp: 'master' } structure.
     * @param  {} socket
     */
    socketDisconnect ( socket ) { // { wpid: 1, sid: 'hash', nsp: 'master' }
        if(this.database !== 'undefined') {
            // this.database.hdel(getServKey( socket.stype ), socket.id);
            this.database.hdel(getSockKey( socket.wpid, socket.stype ), socket.id);
        } else {
            this.debug.log('Redis-Server-Warning', 'Redis database is not set yet.', 'yellow', 'redis');
        }
    }
}

/**
 * Initialized USN usn_redis class.
 * @param  {} config
 */
module.exports.init = ( config ) => {
    return new usn_redis( config );
};