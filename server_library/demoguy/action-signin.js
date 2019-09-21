
var express = require('../express');

// Access the parse results as request.body
express.instance.post('/action-signin', function(req, res){

    express.core.data.signin(req.body.user.name, req.body.user.email, (msg) => {
        console.log(msg);
        if(msg == 'success')
        {
            res.writeHead(301, { "Location": "http://" + req.headers['host'] + '/demoguy/lobby' });
            return res.end();
        }

        else
        {
            res.writeHead(301, { "Location": "http://" + req.headers['host'] + '/demoguy' });
            return res.end();
        }
    });    
});