
var core = require('../server/core');
var redis = require('./demo')(core);

    var con1 = redis.select( 8 );
    con1.addUser( { wpid: '1', data: 'Hello World!' }, ( res ) => {
        console.log( res.status );
    })

    //var con2 = redis.select( 6 );
