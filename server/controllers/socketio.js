
function init(core, server, user, nsp) {
    const socketio = require('socket.io').listen(server);
    const redisAdapter = require('socket.io-redis');
        socketio.adapter(redisAdapter({ host: 'localhost', port: 6379 }));
        //const namespace = socketio.of( '/' + nsp );

        //Prevent client socket connection if condition is not met.
        socketio.use((packet, next) => {

            var data = {};
                data.nsp = nsp;
                data.wpid = packet.handshake.query.wpid;
                data.snid = packet.handshake.query.snid;
     
            core.restapi.post(data, core, (result) => {

                if( result.status == 'success' ) {
                    
                    user.exist(data, (connected) => {

                        socketio.wpid = data.wpid;
                        var entry = 'undefined'
                            switch( nsp ) {
                                case 'master':
                                    entry = JSON.parse(result.data);
                                    entry.mid = packet.id;
                                    delete entry.status;
                                    break;
                                case 'chat':
                                    entry.cid = packet.id;
                                    break;
                                case 'game':
                                    entry.gid = packet.id;
                                    break;
                                default:
                            }
                            entry.wpid = data.wpid;

                            user.entry(entry, (res) => {

                        });
                        return next();
                    });
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
