
function init(server, nsp) {
    const socketio = require('socket.io').listen(server);
    const redisAdapter = require('socket.io-redis');
        socketio.adapter(redisAdapter({ host: 'localhost', port: 6379 }));
        //const namespace = socketio.of( '/' + nsp );
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

    socketio.use((socket, next) => {
        
        core.mysql.query('SELECT ID FROM `wp_users`', (success, data) => {
            if( success ) {
                console.log('data' + JSON.stringify(data) );
            } else {
                console.log('BBBBBBBBBBBBB');
            }
        });

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
} module.exports.conn = conn;
