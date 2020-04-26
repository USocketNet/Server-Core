
const libs = require('usn-libs');
const process = require('process');
const argv = require('minimist')(process.argv.slice(2));

class usn_socketio {  
    
    //Only call this once.  
    constructor ( nsp ) {

        //Choose redis database.
        this.redis = libs.redis.select(0);

        //Create instance for this.
        this.instance = this;

        //get instance of express for this new server.
        this.instance.http = libs.express.init();

        //Requiring socket.io module and passing express.
        const socketio = require('socket.io')(this.instance.http, {
            pingInterval: 10000,
            pingTimeout: 5000,
        });

        //Requiring socket-io-redis as adapter
        const redisAdapter = require('socket.io-redis');
            socketio.adapter( redisAdapter( libs.utils.config.redis() ) );

        //Prevent client socket connection if condition is not met.
        socketio.use((packet, next) => {
            if( typeof packet.handshake.query.wpid === 'undefined' || typeof packet.handshake.query.snid === 'undefined' || typeof packet.handshake.query.apid === 'undefined' ) {
                let msg = 'The client for ' + nsp + ' did not submit required arguments.';
                    libs.utils.debug.log('Socket-Connect-Refused', msg, 'yellow', 'connect')
                    packet.disconnect(true);
                    return next( new Error(msg) );
            } else {
                let data = {};
                data.wpid = packet.handshake.query.wpid;
                data.snid = packet.handshake.query.snid;
                data.apid = packet.handshake.query.apid;
                packet.wpid = data.wpid;
     
                libs.request.verify(data, (respo) => {
                    if( respo.status === 'success' ) {
                        
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
    
                            //let sock = { wpid: data.wpid, sid: packet.id, nsp: nsp };
                            //redis.socketConnect(sock, (res) => {});
    
                            packet.nme = respo.user.uname;
                            return next();
                        } else {
                            libs.utils.debug.log('WPress-Connect-Refused', respo.message, 'yellow', 'connect')
                            packet.disconnect(true);
                            return next( new Error(respo.message) );
                        }
                    } else {
                        libs.utils.debug.log('RestApi-Request-Error', respo.message, 'yellow', 'connect')
                        packet.disconnect(true);
                        return next( new Error(respo.message) );
                    }
                });
            }
        });

        this.instance.sio = socketio;
        return this.instance;
    }

    connect ( type ) {

        let conf = libs.utils.config.server( type, argv );

        return this.instance.http.listen( conf.port, '0.0.0.0', function(err) {
            let sType = type.charAt(0).toUpperCase() + type.slice(1);
            if (err) {
                libs.utils.debug.log('USocketNet-' + sType + '-Stop', 'Connection Refused @ localhost:' + conf.port + '.', 'red', type);
                // INTERUPT THE WHOLE SERVER EXECUTION. !IMPORTANT
                process.exit(1);
            } else {
                libs.utils.debug.log('USocketNet-' + sType + '-Start', 'Server is now listening @ localhost:' + conf.port + '.', 'green', type);
            }
        });
    }
}

module.exports.init = ( nsp ) => {
    return new usn_socketio( nsp );
};