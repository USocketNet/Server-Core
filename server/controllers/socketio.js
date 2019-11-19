
module.exports = {

    init: function(server) {
        const socketio = require('socket.io').listen(server);
        const redisAdapter = require('socket.io-redis');
            socketio.adapter(redisAdapter({ host: 'localhost', port: 6379 }));
        return socketio;
    },

    conn: function (core, server, socketio, type) {

        var config = core.configof(type);
            config.package = core.config.package;

        var conn = server.listen( process.env.PORT || config.port, config.host, function(err) {
            if (err) {
                core.debug.log('Server Init', 'USocketNet Server > ' + type + ' [' + config.package.version + '] - Failed to initialized.', 'red', config.type);
            } else {
                core.debug.log('Server Init', 'USocketNet Server > ' + type + ' [' + config.package.version + '] - Running since ' + new Date().toLocaleString() + '.', 'green', config.type);
            }
        });

        socketio.use((socket, next) => {
            let token = socket.handshake.query.token;
            let seckey = socket.handshake.query.seckey;
            console.log(token + ' - ' + seckey);
          
            let clientId = socket.handshake.query.token;
            if ( clientId == 'demoguy' ) {
              return next();
            }
            return next(new Error('Authentication Error'));
          });

        return conn;
    }

};
