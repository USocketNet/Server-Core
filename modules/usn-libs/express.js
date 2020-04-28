
const path = require('path');
const debug = require('usn-utils').debug;

class usn_express {

    constructor () {
        this.express = require('express'); //web app framework.
        //const bodyParser = require('body-parser'); //accept html post, etc.
            //const urlEncoder = bodyParser.urlencoded({ extended: false }) //with bodyParser.

        this.instance = this.express(); //init express framework.
            const cors = require('cors') //cross domain resource sharing.
            this.instance.use(cors()); //init cors in var instance.
            //instance.use(express.urlencoded()); // Parse URL-encoded bodies (as sent by HTML forms)
            this.instance.use(this.express.json()); // Parse JSON bodies (as sent by API clients)
            
        this.server = require('http').Server(this.instance); //init web protocol with var intance. 

        return this;
    }

    serve_public(port) {
        this.instance.use( this.express.static( path.resolve('public') ) ); //Set static or root public directory.
        console.log(__dirname + '/public');
        this.instance.listen(port, () => {
            debug.log('USocketNet-Demoguy', 'Demo site for this project is now serving at http://localhost:' + port, 'green', 'demoguy')
        });;
    }
}

module.exports.init = () => {
    return new usn_express();
};
