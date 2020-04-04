
module.exports = () => {
    return new usn_express();
};

class usn_express {

    constructor () {
        const express = require('express'); //web app framework.
        const bodyParser = require('body-parser'); //accept html post, etc.
            const urlEncoder = bodyParser.urlencoded({ extended: false }) //with bodyParser.

        const instance = express(); //init express framework.
            const cors = require('cors') //cross domain resource sharing.
            instance.use(cors()); //init cors in var instance.
            //instance.use(express.urlencoded()); // Parse URL-encoded bodies (as sent by HTML forms)
            instance.use(express.json()); // Parse JSON bodies (as sent by API clients)
            //instance.use(express.static( __dirname + '/server/views')); //Set static or root public directory.

            return require('http').Server(instance); //init web protocol with var intance. 
    }
}