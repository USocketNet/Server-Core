
const core = require('./core');
const process = require('process');
const argv = require('minimist')(process.argv.slice(2));

module.exports = ( nsp ) => {
    return new usn_socketio( nsp );
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

            if( typeof packet.handshake.query.wpid == 'undefined' || packet.handshake.query.snid == 'undefined' ) {
                let msg = 'The client for ' + nsp + ' did not submit required arguments.';
                    core.debug.log('Socket-Connect-Refused', msg, 'yellow', 'connect')
                    return next( new Error(msg) );
            } else {
                let data = {};
                data.nsp = nsp;
                data.wpid = packet.handshake.query.wpid;
                data.snid = packet.handshake.query.snid;
                packet.wpid = data.wpid;
     
                core.restapi.verify(data, (result) => {

                    if( result.status == 'success' ) {
                        
                        let redis = core.redis.select(0);
                        
                        switch( nsp ) {
                            case 'master':
                                let user = JSON.parse( result.data );
                                delete user.status;
                                redis.masterInit(user, (res) => {});
                                break;
                            case 'chat': 
                                break;
                            case 'game': 
                                break;
                            default:
                        }

                        let sock = { wpid: data.wpid, sid: packet.id, nsp: nsp };
                        redis.socketConnect(sock, (res) => {});

                        packet.nme = JSON.parse(result.data).uname;              
                        return next();
                    } else {
                        let msg = 'Token used for ' + nsp + ' server connection is expired or invalid.';
                        core.debug.log('Socket-Connect-Refused', msg, 'yellow', 'connect')
                        return next( new Error(msg) );
                    }
                });
            }
        });

        this.instance = this;
        this.instance.sio = socketio;
        this.instance.http = server;

        return this.instance;
    }

    connect ( type ) {

        let config = core.configof(type);
            config.package = core.config.package;

        let port = process.env.PORT || config.port;
        switch ( type ) {
            case 'master':
                port = argv.master;
                break;
            case 'chat':
                port = argv.chat;
                break;
            case 'game':
                port = argv.game;
                break;
            default:
        }

        return this.instance.http.listen( port, config.host, function(err) {
            if (err) {
                core.debug.log('Server Init', 'USocketNet Server > ' + type + ' [' + port + '] - Failed to initialized.', 'red', config.type);
                // INTERUPT THE WHOLE SERVER EXECUTION. !IMPORTANT
                process.exit(1);
            } else {
                core.debug.log('Server Init', 'USocketNet Server > ' + type + ' [' + port + '] - Running since ' + new Date().toLocaleString() + '.', 'green', config.type);
            }
        });
    }
}
