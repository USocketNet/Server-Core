
const config = require('usn-utils').config;
const debug = require('usn-utils').debug;
const libs = require('usn-libs');
const process = require('process');
const argv = require('minimist')(process.argv.slice(2));

class usn_socketio {  
    
    //Only call this once.  
    constructor ( nsp ) {
        //Choose redis database.
        this.redis = libs.redis.select(0);

        //Create instance for this.
        this.instance = this;

        //get instance of express for this new server.
        this.instance.http = libs.express.init();

        //Requiring socket.io module and passing express.
        const socketio = require('socket.io')(this.instance.http, {
            pingInterval: 10000,
            pingTimeout: 5000,
        });

        //Requiring socket-io-redis as adapter
        const redisAdapter = require('socket.io-redis');
            socketio.adapter( redisAdapter( config.redis() ) );

        this.instance.sio = socketio;
        return this.instance;
    }

    connect ( type ) {

        let conf = config.server( type, argv );

        return this.instance.http.listen( conf.port, '0.0.0.0', function(err) {
            let sType = type.charAt(0).toUpperCase() + type.slice(1);
            if (err) {
                debug.log('USocketNet-' + sType + '-Stop', 'Connection Refused @ localhost:' + conf.port + '.', 'red', type);
                // INTERUPT THE WHOLE SERVER EXECUTION. !IMPORTANT
                process.exit(1);
            } else {
                debug.log('USocketNet-' + sType + '-Start', 'Server is now listening @ localhost:' + conf.port + '.', 'green', type);
            }
        });
    }
}

module.exports.init = ( nsp ) => {
    return new usn_socketio( nsp );
};

module.exports.libs = () => {
    return libs;
};