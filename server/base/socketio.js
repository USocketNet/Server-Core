
const core = require('./core');
const process = require('process');
const argv = require('minimist')(process.argv.slice(2));

module.exports = ( nsp ) => {
    return new usn_socketio( nsp );
};

class usn_socketio {    
    constructor ( nsp ) {
        const server = require('./express')();
        const socketio = require('socket.io').listen(server);
            const redisAdapter = require('socket.io-redis');
            socketio.adapter( redisAdapter({ host: 'localhost', port: 6379 }) );
            //socketio.origins(['http://localhost:19090','http://localhost:6060','http://localhost:9090']);
            // socketio.origins((origin, callback) => {
            //     console.log(origin);
            //     if (origin !== 'http://localhost') {
            //       return callback('origin not allowed', false);
            //     }
            //     callback(null, true);
            //   });

            //const namespace = socketio.of( '/' + nsp );

        //Prevent client socket connection if condition is not met.
        socketio.use((packet, next) => {
            //packet.disconnect(true);

            if( typeof packet.handshake.query.wpid === 'undefined' || typeof packet.handshake.query.snid === 'undefined' || typeof packet.handshake.query.apid === 'undefined' ) {
                let msg = 'The client for ' + nsp + ' did not submit required arguments.';
                    core.debug.log('Socket-Connect-Refused', msg, 'yellow', 'connect')
                    return next( new Error(msg) );
            } else {
                let data = {};
                data.wpid = packet.handshake.query.wpid;
                data.snid = packet.handshake.query.snid;
                data.apid = packet.handshake.query.apid;
                packet.wpid = data.wpid;
     
                core.restapi.verify(data, (result) => {
                    if( result.status === 'success' ) {
                        let redis = core.redis.select(0);
                        let respo = JSON.parse( result.data );
                        
                        if( respo.status === 'success' ) {
                            switch( nsp ) {
                                case 'master':
                                    delete respo.status;
                                    //redis.masterInit(respo, (res) => {});
                                    break;
                                case 'chat': 
                                    break;
                                case 'game': 
                                    break;
                                default:
                            }
    
                            let sock = { wpid: data.wpid, sid: packet.id, nsp: nsp };
                            //redis.socketConnect(sock, (res) => {});
    
                            packet.nme = respo.user.uname;
                            return next();
                        } else {
                            core.debug.log('WPress-Connect-Refused', respo.message, 'yellow', 'connect')
                            return next( new Error(respo.message) );
                        }
                    } else {
                        core.debug.log('RestApi-Request-Error', result.message, 'yellow', 'connect')
                        return next( new Error(result.message) );
                    }
                });
            }
        });

        this.instance = this;
        this.instance.sio = socketio;
        //this.instance.sio = socketio.of( '/' + nsp );
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
            let sType = type.charAt(0).toUpperCase() + type.slice(1);
            if (err) {
                core.debug.log('USocketNet-' + sType + '-Stop', 'This server failed to run @ ' + config.host + ':' + port + '.', 'red', config.type);
                // INTERUPT THE WHOLE SERVER EXECUTION. !IMPORTANT
                process.exit(1);
            } else {
                core.debug.log('USocketNet-' + sType + '-Init', 'This server is now listening @ ' + config.host + ':' + port + '.', 'green', config.type);
            }
        });
    }
}
