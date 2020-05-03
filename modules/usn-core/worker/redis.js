
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

class usn_worker_redis {

    /**
     * During instantiation of usn_express class, a constructor is 
     * invoked which needs 3 parameter. SocketIO reference, stype or 
     * server type name and also port used by ther server type.
     */  
    constructor (socketio, stype, port) {
        //Include USocketNet logging system.
        this.debug = require('usn-utils').debug;

        //Include USocketNet debug system.
        this.config = require('usn-utils').config;

        //Include USocketNet libraries & Select databsae for this server.
        this.redis = require('usn-libs').redis.init(this.config.redis());
            this.redis.select(0);        

        socketio.on('connection', (socket) => {
            //Set server type were in.
            socket.stype = stype;

            //Server logging about the connection on Master Server.
            this.debug.log(stype + ' Server', socket.uname + ' #' + socket.wpid + ' connect @ port ' + port + ' with sid of ' + socket.id, 'white', 'connect');

            //Register user socket instance to redis.
            this.redis.socketConnect(socket, (err) => {});

            //Listens for any server-client disconnection
            socket.on('disconnect', (reason) => {
                //Unegister user socket instance to redis.
                this.redis.socketDisconnect( socket );
                
                //Server logging about the disconnection on Master Server.
                this.debug.log(stype + ' Server', socket.uname + ' #' + socket.wpid + ' disconnect @ port ' + port + ' with sid of ' + socket.id + ' - ' + reason, 'white', 'disconnect');
            });

            socket.on('error', (error) => {
                //Unegister user socket instance to redis.
                this.redis.socketDisconnect( socket );

                //Server logging about the Socket Error on Master Server.
                this.debug.log(stype + ' Server', socket.uname + ' #' + socket.wpid + ' disconnect @ port ' + port + ' with sid of ' + socket.id + ' - ' + error, 'white', 'disconnect');
            });
        });
    }
}

/**
 * Initialized USN usn_worker_redis class.
 * @param  {} socketio
 * @param  {} stype
 * @param  {} port
 */
module.exports.init = (socketio, stype, port) => {
    return new usn_worker_redis(socketio, stype, port);
};
