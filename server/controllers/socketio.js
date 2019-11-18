
module.exports = function(core, server) {

    const socketio = require('socket.io').listen(server);
    const redisAdapter = require('socket.io-redis');
        socketio.adapter(redisAdapter({ host: 'localhost', port: 6379 }));

    return socketio;

};
