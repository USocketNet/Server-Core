
module.exports = function(core) {
    
    var express = require('express'); //web app framework.
    var bodyParser = require('body-parser'); //accept html post, etc.
        var urlEncoder = bodyParser.urlencoded({ extended: false }) //with bodyParser.

    var instance = express(); //init express framework.
        var cors = require('cors') //cross domain resource sharing.
        instance.use(cors()); //init cors in var instance.
        //instance.use(express.urlencoded()); // Parse URL-encoded bodies (as sent by HTML forms)
        instance.use(express.json()); // Parse JSON bodies (as sent by API clients)
        //instance.use(express.static( __dirname + '/server/views')); //Set static or root public directory.
    
    var server = require('http').Server(instance); //init web protocol with var intance. 

    return server; //Return the instance of http server with express.

};
