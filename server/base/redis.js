
const redis = require('ioredis');
const debug = require('./debug')();

//#region Helper function for redis script.
    //Check if js obj is empty or not.
    function isObjectEmpty(obj) {
        return !Object.keys(obj).length;
    }

    //Make sure that json var is not reference.
    function cloneJson( json ) {
        var string = JSON.stringify(json);
        return JSON.parse(string);
    }

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

module.exports = ( config ) => {
    return new usn_redis( config );
};

class usn_redis {

    config = null;

    //Initialized instance of redis.
    constructor ( conf ) {
        this.config = cloneJson( conf );
        delete this.config.database;
        return this;
    }

    //Create a client to connect to redis.
    select( db = 1 ) {

        if( typeof this.config == 'undefined') {
            console.log('undefined config.');
            return null;
        }

        var conf = cloneJson(this.config);
            conf.db = db;

        return new usn_redis_conn( conf );
    }

    ping () {
        redis.createClient( this.config ).ping( (err, result) => {
            if( err ) {
                debug.log('Redis-Server-Error', 'Redis connection check return error. Please check redis-server.', 'red', 'redis');
                process.exit(1);
            } else {
                debug.log('Redis-Server-Success', 'Redis connection check was successful with healthy response.', 'green', 'redis');
            }
        });
    }
}

class usn_redis_conn {
    database = null;
    constructor ( config ) {
        this.database = redis.createClient( config );
        return this;
    }

    getUser( wpid, cback ) {
        this.database.hgetall( getUserKey(wpid), function (err, obj) {
            if( err ) {
                cback( { status: 'error', info: 'Error finding user: ' + err } );
            } else {
                if( isObjectEmpty(obj) ) {
                    cback( { status: 'notfound' } );
                } else {
                    cback( { status: 'success', data: obj } );
                }
            }
        });
    }

    addUser( user, cback ) {
        this.database.hmset( getUserKey(user.wpid), user, function (err, res) {
            if( err ) {
                cback( { status: 'error', info: 'Error add user to redis: ' + res } );
            } else {
                cback( { status: 'success', info: 'Created information: ' + res } );
            }
        });
        
    }

    updateUser( user, cback ) {
        this.database.hmset( getUserKey(user.wpid), user, function (err, res) {
            if( err ) {
                cback( { status: 'error', info: 'Error add user to redis: ' + res } );
            } else {
                cback( { status: 'success', info: 'Updated information: ' + res } );
            }
        });
    }

    masterInit( user, cback ) {
        this.database.hmset( getUserKey( user.wpid ), user, (err, res) => {
            if( err ) {
                cback( { status: 'failed', data: null } );
            } else {
                cback( { status: 'success', data: res} );
            }
        });
    }

    socketConnect ( socket, cback ) { // { wpid: 1, sid: 'hash', nsp: 'master' }

        let sid = socket.sid;
        let curSocket = { [sid]: new Date() };

        this.database.hset( getSockKey( socket.wpid, socket.nsp ), curSocket, (err, res) => {
            if( err ) {
                cback( { status: 'failed', data: null } );
            } else {
                cback( { status: 'success', data: res} );
            }
        });
    }

    socketDisconnect ( socket ) { // { wpid: 1, sid: 'hash', nsp: 'master' }

        this.database.hdel(getSockKey( socket.wpid, socket.nsp ), socket.sid);
    }
}
