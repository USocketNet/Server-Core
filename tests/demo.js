
var redis = require('ioredis');

//Check if js obj is empty or not.
function isObjectEmpty(obj) {
    return !Object.keys(obj).length;
}

//Make sure that json var is not reference.
function cloneJson( json ) {
    var string = JSON.stringify(json);
    return JSON.parse(string);
}

function getUserKey( wpid ) {
    return 'wpid_' + wpid;
}

function getMsgKey( wpid ) {
    return 'msg_' + wpid;
}

class usn_redis {

    config = null; debug = null;

    //Initialized instance of redis.
    constructor ( core ) {
        this.config = core.config.admin.redis;
        this.debug = core.debug;
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
} 

function init( core ) {
    return new usn_redis( core );
} module.exports = init;

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
