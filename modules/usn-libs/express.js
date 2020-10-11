
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

class usn_express {

    /**
     * During instantiation of usn_express class, a constructor is 
     * invoked which needs 0 parameter.
     */
    constructor () {
        //Require nodejs native path package.
        this.path = require('path');

        //Include the usn-utils->usn_debug class.
        this.debug = require('usn-utils').debug;

        //Require and embed express to this class.
        this.express = require('express');

        //Initialized the express into instance.
        this.instance = this.express();

        //Parse the body respond by this instance.
        this.instance.use(this.express.json());
        
        //Build an http server with this express object.
        this.server = require('http').Server(this.instance);
    }

    /**
     * Add express static files before running.
     * @param  {} port
     */
    set_static(rootUri, filePath) {
        //Used the package.json of the script executed as a root directory and resolve or find public folder.
        this.instance.use(rootUri, this.express.static( this.path.resolve(filePath) ) )
    }

    /**
     * Run the instance as http server and embed to this class.
     * @param  {} port
     */
    serve(port) {
        //Run the http server from the port that was provided.
        this.instance.listen(port, () => {
            this.debug.log('USocketNet-Demoguy', 'Demoguy site  is now serving at http://localhost:' + port, 'green', 'demoguy')
        });;
    }
}

/**
 * Initialized USN usn_express class.
 * @param  {} =>{ return new usn_express() }
 */
module.exports.init = () => {
    return new usn_express();
};
