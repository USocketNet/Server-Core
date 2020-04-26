
const utils = require('usn-utils');
const redis = require('ioredis');

//#region Helper function for redis script.
    //Make a default socket key.
    function getSockKey( wpid, nsp ) {
        switch(nsp) {
            case 'master':
                nsp = 'mid';
                break;
            case 'chat':
                nsp = 'cid';
                break;
            case 'game':
                nsp = 'gid';
                break;
            default:
        }
        return 'user:' + wpid + ':' + nsp;
    }

    //Make a default user key.
    function getUserKey( wpid ) {
        return 'user:' + wpid;
    }

    //Make a default message key.
    function getMsgKey( wpid ) {
        return 'msg:' + wpid;
    }
//#endregion

class usn_redis {

    //Initialized instance of redis.
    constructor ( conf ) {
        this.config = utils.json.cloneJson( conf );
        return this;
    }

    //Create a client to connect to redis.
    select( db ) {

        if( typeof this.config !== 'undefined') {
            let conf = this.config;
                conf.db = db;
            this.database = redis.createClient( conf );
        } else {
            utils.debug.log('Redis-Server-Warning', 'Redis database selection was failed.', 'red', 'redis');
            process.exit(1);
        }
    }

    //Initially check redis server.
    ping () {
        redis.createClient( this.config ).ping( (err, res) => {
            if( err ) {
                usn.debug.log('Redis-Server-Error', 'Redis connection check return error.', 'red', 'redis');
                process.exit(1);
            } else {
                usn.debug.log('Redis-Server-Success', 'Redis connection check was a success.', 'green', 'redis');
            }
        });
    }

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
            utils.debug.log('Redis-Server-Warning', 'Redis database is not set yet.', 'yellow', 'redis');
        }
    }

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
            utils.debug.log('Redis-Server-Warning', 'Redis database is not set yet.', 'yellow', 'redis');
        }
    }

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
            utils.debug.log('Redis-Server-Warning', 'Redis database is not set yet.', 'yellow', 'redis');
        }
    }

    masterInit( user, cback ) {
        if(this.database !== 'undefined') {
            this.database.hmset( getUserKey( user.wpid ), user, (err, res) => {
                if( err ) {
                    cback( { status: 'failed', data: null } );
                } else {
                    cback( { status: 'success', data: res} );
                }
            });
        } else {
            cback( { status: 'noredisdb' } );
            utils.debug.log('Redis-Server-Warning', 'Redis database is not set yet.', 'yellow', 'redis');
        }
    }

    socketConnect ( socket, cback ) { // { wpid: 1, sid: 'hash', nsp: 'master' }
        if(this.database !== 'undefined') {
            let sid = socket.sid;
            let curSocket = { [sid]: new Date() };

            this.database.hset( getSockKey( socket.wpid, socket.nsp ), curSocket, (err, res) => {
                if( err ) {
                    cback( { status: 'failed', data: null } );
                } else {
                    cback( { status: 'success', data: res} );
                }
            });
        } else {
            cback( { status: 'noredisdb' } );
            utils.debug.log('Redis-Server-Warning', 'Redis database is not set yet.', 'yellow', 'redis');
        }
    }

    socketDisconnect ( socket ) { // { wpid: 1, sid: 'hash', nsp: 'master' }
        if(this.database !== 'undefined') {
            this.database.hdel(getSockKey( socket.wpid, socket.nsp ), socket.sid);
        } else {
            utils.debug.log('Redis-Server-Warning', 'Redis database is not set yet.', 'yellow', 'redis');
        }
    }
}

module.exports.init = ( config ) => {
    return new usn_redis( config );
};