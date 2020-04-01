
var redis = require('ioredis');
var conn = 'undefined';
var core = 'undefined';

//Check if js obj is empty or not.
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

//Make sure that json var is not reference.
function sanitizeJSON( json ) {
    var string = JSON.stringify(json);
    return JSON.parse(string);
}

function getUserKey( wpid ) {
    return 'wpid_' + wpid;
}

function init( mcore, type ) {
    //Initialy get reference to the core.
    core = mcore;

    //Initialized redis instance with param from config.
    var rconf = mcore.config.admin.redis;
        rconf.db = mcore.configof(type).redis.db;
        conn = new redis.createClient( rconf );
    //redis = redis.createClient();

    //console.log( 'Redis Initialize: ' + rconf.db + ' from ' + type);
    return this;
} module.exports.init = init;

function getUser( wpid, cback ) {
    conn.hgetall( getUserKey(wpid), function (err, obj) {
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
} module.exports.getUser = getUser;

function addUser( user, cback ) {
    conn.hmset( getUserKey(user.wpid), user, function (err, res) {
        if( err ) {
            cback( { status: 'error', info: 'Error add user to redis: ' + res } );
        } else {
            cback( { status: 'success', info: 'Created information: ' + res } );
        }
    });
} module.exports.addUser = addUser;

function test() {
    //Get the rows key inside hashset.
    // conn.hkeys('wpid_3',  function (err, replies) {
    //     console.log(' replies:');
    //     replies.forEach(function (reply, i) {
    //         console.log('    ' + i + ': ' + reply);
    //     });
    // });

    //Get the object of the key hmset.
    // conn.hgetall("wpid_4", function (err, obj) {
    //     if( err ) {
    //         console.log( 'Redis Error: ' + err );
    //     } else {
    //         if( isEmptyObject(obj) ) {
    //             console.log( 'Redis Result: Empty' );
    //         } else {
    //             console.log( 'Redis Result: ' + JSON.stringify(obj) );
    //         }
    //     }
    // });

    //Set the rows key inside hashset. WRITE/OVERWRITE need CHECKING
    // conn.hmset("wpid_4", { uname: 'Jepoy', pword: 'Password123' }, function (err, res) {
    //     if( err ) {
    //         console.log( 'Redis Error: ' + err );
    //     } else {
    //         console.log( 'Redis Result: ' + res );
    //     }
    // });

} module.exports.test = test;
