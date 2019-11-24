
function init(core, server, nsp) {
    const socketio = require('socket.io').listen(server);
    const redisAdapter = require('socket.io-redis');
        socketio.adapter(redisAdapter({ host: 'localhost', port: 6379 }));
        //const namespace = socketio.of( '/' + nsp );

        //Prevent client socket connection if condition is not met.
        socketio.use((packet, next) => {

            var data = {};
                data.wpid = packet.handshake.query.wpid;
                data.snid = packet.handshake.query.snid;
        
            core.restapi.post(data, core, (returnee) => {
                var resultee = JSON.parse(returnee);
                if( resultee.status == 'success' ) {
                    return next();
                } else {
                    var msg = 'Token used for ' + nsp + ' server connection is expired or invalid.';
                    core.debug.log('Socket-Connect-Refused', msg, 'yellow', 'connect')
                    return next( new Error(msg) );
                }
            });
        });

    return socketio;
} module.exports.init = init;

function conn(core, server, socketio, type) {
    var config = core.configof(type);
        config.package = core.config.package;

    var conn = server.listen( process.env.PORT || config.port, config.host, function(err) {
        if (err) {
            core.debug.log('Server Init', 'USocketNet Server > ' + type + ' [' + config.package.version + '] - Failed to initialized.', 'red', config.type);
            // INTERUPT THE WHOLE SERVER EXECUTION. !IMPORTANT
            process.exit(1);
        } else {
            core.debug.log('Server Init', 'USocketNet Server > ' + type + ' [' + config.package.version + '] - Running since ' + new Date().toLocaleString() + '.', 'green', config.type);
        }
    });

    return conn;
} module.exports.conn = conn;
