
/*
    * Package: USocketNet
    * Description: Multipurpose Realtime Server for your 
    *   Multiplayer Game, Chat App, or Delivery App.
    * Package-Website: https://usocketnet.bytescrafter.net
    * 
    * Author: Bytes Crafter
    * Author-Website:: https://www.bytescrafter.net/about-us
    * License: Copyright (C) Bytes Crafter - All rights Reserved. 
*/

class usn_process {

    /**
     * During instantiation of usn_process class, a constructor is 
     * invoked which needs 0 parameter.
     */
    constructor () {
        //Reference for usn_debug class within this package.
        this.debug = require('./debug').init();

        //Reference for usn_debug class within this package.
        this.config = require('./config').init();

        // By using usn_config class, we can check if production is enabled.
        // If enabled, filter process event and log on console. 
        if(this.config.safe('production', false)) {

            //Instead of exiting or close server, resume before actually exiting.
            process.stdin.resume();

            //Invoked when nodejs instance experience error.
            process.on('uncaughtException', function (uerror) {
                this.debug.log( 'UncaughtException', + uerror.stack + ' @ ' + uerror, 'red', 'process' );
            });

            //Invoked before exit of application.
            process.on("beforeExit", () => 
                this.debug.log('BeforeExit', 'Received warning that the node server application is trying to shutdown!', 'red', 'process')
            );

            //Called on actual exit of nodejs instance.
            process.on("exit", () => 
                this.debug.log('Exitting', 'Node server application was shutdown for some reason!', 'red', 'process')
            );
        }
    }
}

/**
 * Initialized USN process event handler class.
 * @param  {} =>{ return new usn_process() }
 */
module.exports.init = () => {
	return new usn_process();
}
