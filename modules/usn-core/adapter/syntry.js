
/*
    * Package: USocketNet
    * Description: Self-Host Realtime Multiplayer Server 
    *       for your Game or Chat Application.
    * Package-Website: https://usocketnet.bytescrafter.net
    * 
    * Author: Bytes Crafter
    * Author-Website:: https://www.bytescrafter.net/about-us
    * License: Copyright (C) Bytes Crafter - All rights Reserved. 
*/

//Include usn-utils->usn_debug class as global.
const debug = require('usn-utils').debug;
const config = require('usn-utils').config;

 //Include the usn-libs->usn_restapi class.
const restapi = require('usn-libs').restapi.init( config.safe('restapi.url', 'http://localhost') )

class usn_syntry {

    /**
     * During instantiation of usn_syntry class, a constructor is 
     * invoked which needs 0 parameter.
     */  
    constructor () {
       //Nothing happen for now.
    }
    
    /**
     * @param  {} packet
     * @param  {} next
     */
    verification( packet, next ) {
        //If the connection did not submit wpid and snid to verify user. Refuse connection!
        if( typeof packet.handshake.query.wpid === 'undefined' || typeof packet.handshake.query.snid === 'undefined' ) {
            //Composed a message for this unknownn connection.
            let msg = 'The client for ' + nsp + ' did not submit required arguments.';

            //Sending message to USocketNet logging system. 
            debug.log('Socket-Connect-Refused', msg, 'yellow', 'connect')

            //Disconnect socket connection and return error message.
            packet.disconnect(true);
            return next( new Error(msg) );
        }

        //Prepare a credential object for rest.
        let credential = {
            wpid: packet.handshake.query.wpid,
            snid: packet.handshake.query.snid
        };

        //Verify the user through our USocketNet WordPress API plugin.
        restapi.user_verify(credential, (response) => {
            if( response.status == 'success' ) {
                packet.wpid = credential.wpid;
                packet.uname = response.data.uname;
                return next();
            } else {
                debug.log('RestApi-Request-Error', response.message, 'yellow', 'connect')
                packet.disconnect(true);
                return next( new Error(response.message) );
            }
        });
    }
}

/**
 * Initialized USN usn_syntry class.
 * @param  {} nsp
 */
module.exports.init = () => {
    return new usn_syntry();
};
