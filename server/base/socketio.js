
const core = require('./core');
const process = require('process');
const debug = require('./debug')();

module.exports = () => {
    return new usn_socketio();
};

class usn_socketio {
    instance = 'undefined';
    
    constructor ( nsp ) {
        const server = require('./express')();
        const socketio = require('socket.io').listen(server);
            const redisAdapter = require('socket.io-redis');
            socketio.adapter( redisAdapter({ host: 'localhost', port: 6379 }) );
            //const namespace = socketio.of( '/' + nsp );

        //Prevent client socket connection if condition is not met.
        socketio.use((packet, next) => {

            let data = {};
                data.nsp = nsp;
                data.wpid = packet.handshake.query.wpid;
                data.snid = packet.handshake.query.snid;

                this.instance.wpid = data.wpid;
     
            core.restapi.verify(data, (result) => {

                if( result.status == 'success' ) {
                    this.instance.nme = JSON.parse(result.data).uname;              
                    return next();
                } else {
                    let msg = 'Token used for ' + nsp + ' server connection is expired or invalid.';
                    debug.log('Socket-Connect-Refused', msg, 'yellow', 'connect')
                    return next( new Error(msg) );
                }
            });
        });

        this.instance = this;
        this.instance.sio = socketio;
        this.instance.http = server;

        return this.instance;
    }

    connect ( type ) {

        let config = core.configof(type);
            config.package = core.config.package;

        return this.instance.http.listen( process.env.PORT || config.port, config.host, function(err) {
            if (err) {
                debug.log('Server Init', 'USocketNet Server > ' + type + ' [' + config.package.version + '] - Failed to initialized.', 'red', config.type);
                // INTERUPT THE WHOLE SERVER EXECUTION. !IMPORTANT
                process.exit(1);
            } else {
                debug.log('Server Init', 'USocketNet Server > ' + type + ' [' + config.package.version + '] - Running since ' + new Date().toLocaleString() + '.', 'green', config.type);
            }
        });
    }
}
