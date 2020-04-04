
const redis = require('ioredis');
const debug = require('./debug');

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

    //Make a default user key.
    function getUserKey( wpid ) {
        return 'wpid_' + wpid;
    }

    //Make a default message key.
    function getMsgKey( wpid ) {
        return 'msg_' + wpid;
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
                debug.log('Redis-Init-Error', 'Redis Server connection check return error. Please check redis-server.', 'red', 'redis');
                process.exit(1);
            } else {
                debug.log('Redis-Init-Success', 'Redis Server connection check was successful with healthy response.', 'green', 'redis');
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
                if( isEmptyObject(obj) ) {
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

    entry( user, cback ) {
        getUser(user.wpid, (res) => {
            if( res.status == 'success' ) {
    
              updateUser( user, ( result ) => {
                if( result.status == 'success' ) {
                    cback( result );
                } else {
                    cback( result );
                }
              });
    
            } else if( res.status == 'notfound' ) {
    
              addUser( user, ( result ) => {
                if( result.status == 'success' ) {
                    cback( result );
                } else {
                    cback( result );
                }
              });
    
            }
        }); 
    }
}
