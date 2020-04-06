
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

            if( typeof packet.handshake.query.wpid === 'undefined' || typeof packet.handshake.query.snid === 'undefined' ) {
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

                    if( result.status === 'success' ) {
                        let redis = core.redis.select(0);
                        let user = JSON.parse( result.data );

                        if( user.status === 'success' ) {
                            switch( nsp ) {
                                case 'master':
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
                            core.debug.log('WPress-Connect-Refused', user.message, 'yellow', 'connect')
                            return next( new Error(user.message) );
                        }
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
