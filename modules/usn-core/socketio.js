
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

//Include usn-utils->usn_debug class as global.
const debug = require('usn-utils').debug;

class usn_socketio {  
    
    /**
     * During instantiation of usn_express class, a constructor is 
     * invoked which needs 1 parameter. The stype is the server type 
     * name like master or match.
     */  
    constructor ( stype ) {
        //Create instance for this.
        this.instance = this;

        //Make sure to include config used for socketio.
        this.config = require('usn-utils').config;

        //Include express subpackage module by USocketNet
        this.express = require('usn-libs').express;

        //Listens for nodejs arguments.
        this.argv = require('minimist')(process.argv.slice(2));

        //get instance of express for this new server.
        this.instance.http = this.express.init().server;

        //Requiring socket.io module and passing express.
        const socketio = require('socket.io')(this.instance.http, {
            pingInterval: 10000,
            pingTimeout: 5000,
        });

        //Requiring socket-io-redis as adapter
        const redisAdapter = require('socket.io-redis');
            socketio.adapter( redisAdapter( this.config.redis() ) );

        //Referencing the socketio instance in this class.
        this.instance.sio = socketio;

        return this.instance;
    }

    /**
     * When return success, the server can now accept client connection request. 
     * @param  {} type
     */
    connect ( type ) {
        //Process the parameter to be used for server instancing.
        let conf = this.config.server( type, this.argv );
        let sType = type.charAt(0).toUpperCase() + type.slice(1);

        //Include redis worker to check on user connection status.
        const worker_redis = require('./worker/redis');
            worker_redis.init(this.instance.sio, sType, conf.port );

        //Make a log about server init status, whether it failed or success.
        return this.instance.http.listen( conf.port, '0.0.0.0', function(err) {
            if (err) {
                debug.log('USocketNet-' + sType + '-Stop', 'Connection Refused @ localhost:' + conf.port + '.', 'red', type);
                process.exit(1); // INTERUPT THE WHOLE SERVER EXECUTION. !IMPORTANT
            } else {
                debug.log('USocketNet-' + sType + '-Start', 'Server is now listening @ localhost:' + conf.port + '.', 'green', type);
            }
        });
    }
}

/**
 * Initialized USN usn_socketio class.
 * @param  {} nsp
 */
module.exports.init = ( nsp ) => {
    return new usn_socketio( nsp );
};
