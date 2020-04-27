
const redis = require('usn-libs').redis;
const debug = require('usn-utils').debug;

class usn_worker_redis {

    constructor (socketio, stype, port) {
        //Select databsae for this server.
        redis.select(0);

        socketio.on('connection', (socket) => {
            //Set server type were in.
            socket.stype = stype;

            //Server logging about the connection on Master Server.
            debug.log(stype + ' Server', socket.uname + ' #' + socket.wpid + ' connect @ port ' + port + ' with sid of ' + socket.id, 'white', 'connect');

            //Register user socket instance to redis.
            redis.socketConnect(socket, () => {});

            //Listens for any server-client disconnection
            socket.on('disconnect', (reason) => {
                //Unegister user socket instance to redis.
                redis.socketDisconnect( socket );
                
                //Server logging about the disconnection on Master Server.
                debug.log(stype + ' Server', 'User #' + socket.wpid + ' disconnect @ port ' + port + ' with sid of ' + socket.id + ' - ' + reason, 'white', 'disconnect');
            });

            socket.on('error', (error) => {
                //Unegister user socket instance to redis.
                redis.socketDisconnect( socket );

                //Server logging about the Socket Error on Master Server.
                debug.log(stype + ' Server', 'User #' + socket.wpid + ' disconnect @ port ' + port + ' with sid of ' + socket.id + ' - ' + error, 'white', 'disconnect');
            });
        });
    }
}

module.exports.init = (socketio, stype, port) => {
    return new usn_worker_redis(socketio, stype, port);
};
