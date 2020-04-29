
const debug = require('usn-utils').debug;
const request = require('usn-libs').restapi;

class confilter {

    constructor () {
        
    }

    verification( packet, next ) {
        if( typeof packet.handshake.query.wpid === 'undefined' || typeof packet.handshake.query.snid === 'undefined' ) {
            let msg = 'The client for ' + nsp + ' did not submit required arguments.';
                debug.log('Socket-Connect-Refused', msg, 'yellow', 'connect')
                packet.disconnect(true);
                return next( new Error(msg) );
        } else {
            let data = {};
            data.wpid = packet.handshake.query.wpid;
            data.snid = packet.handshake.query.snid;
 
            request.verify(data, (response) => {
                if( response.status === 'success' ) {
                    
                    if( response.status === 'success' ) {

                        //let sock = { wpid: data.wpid, sid: packet.id, nsp: nsp };
                        //redis.socketConnect(sock, (res) => {});

                        packet.wpid = data.wpid;
                        packet.uname = response.user.uname;
                        return next();
                    } else {
                        debug.log('WPress-Connect-Refused', response.message, 'yellow', 'connect')
                        packet.disconnect(true);
                        return next( new Error(response.message) );
                    }
                } else {
                    debug.log('RestApi-Request-Error', response.message, 'yellow', 'connect')
                    packet.disconnect(true);
                    return next( new Error(response.message) );
                }
            });
        }
    }
}

module.exports.init = () => {
    return new confilter();
};
