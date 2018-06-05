//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytes-crafter.com"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2018.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var core = require('./core');

var express = require('express'); //web app framework.
var cors = require('cors') //cross domain resource sharing.
var swagstats = require('swagger-stats');
var bodyParser = require('body-parser'); //accept html post, etc.
    var urlEncoder = bodyParser.urlencoded({ extended: false }) //with bodyParser.

var instance = express(); //init express framework.
    instance.use(cors()); //init cors in var instance.
    instance.use(swagstats.getMiddleware({})); // Enable swagger-stats middleware in express app, passing swagger specification as option 
    instance.use(express.static( __dirname + '/../public_html')); //sample chat app.

var server = require('http').Server(instance); //init web protocol with var app.    
    
    instance.get('*', function (request, response)
	{
        response.sendFile(express.static( __dirname + '/../public_html'));
		response.end();
    });
    
    instance.post('/ping', urlEncoder, function (request, response)
    {
        if (typeof request.body.apikey != 'undefined')
        {
            if (request.body.apikey == core.admin.authKey)
            {
                response.writeHead(200, { 'Content-Type': 'application/json' });
				var returning = {};
					returning.result = "success";
				response.write(JSON.stringify(returning));
                response.end();
            }

            else
            {
				response.redirect('http://usocket.bytes-crafter.com');
                response.end();
            }
        }

        else
        {
            response.redirect('http://usocket.bytes-crafter.com');
            response.end();
        }
    });
    
    instance.post('/server', urlEncoder, function (request, response)
    {
        if (typeof request.body.apikey != 'undefined')
        {
            if (request.body.apikey == core.admin.authKey)
            {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.write(JSON.stringify(core.data.stats));
                response.end();
            }

            else
            {
				response.redirect('http://usocket.bytes-crafter.com');
                response.end();
            }
        }

        else
        {
            response.redirect('http://usocket.bytes-crafter.com');
            response.end();
        }
    });
    
    instance.post('/channels', urlEncoder, function (request, response)
    {
        if (typeof request.body.apikey != 'undefined')
        {
            if (request.body.apikey == core.admin.authKey)
            {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.write(JSON.stringify(core.channels));
                response.end();
            }

            else
            {
				response.redirect('http://usocket.bytes-crafter.com');
                response.end();
            }
        }

        else
        {
            response.redirect('http://usocket.bytes-crafter.com');
            response.end();
        }
    });
    
    instance.post('/users', urlEncoder, function (request, response)
    {
        if (typeof request.body.apikey !== 'undefined')
        {
            if (request.body.apikey == core.admin.authKey)
            {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.write(JSON.stringify(core.users));
                response.end();
            }

            else
            {				
				response.redirect('http://usocket.bytes-crafter.com');
                response.end();
            }
        }

        else
        {
			response.writeHead(200, { 'Content-Type': 'text/html' });
            response.redirect('http://usocket.bytes-crafter.com');
            response.end();
        }
    });
    
module.exports = 
{
    init: function(worker)
    {
        server.listen(process.env.PORT || core.admin.serverPort, core.admin.serverHost, function()
        {
            if(core.admin.cluster)
            {
                core.debug.log('Initialization', 'Master fork on and is now listening on worker ' + worker.id + ' at ' 
                    + server.address().address + ':' + server.address().port, 'green', 'Server');
            }

            else
            {
                core.debug.log('Initialization', 'USocketNet ' + core.package.version + ' has been initialized. Listening: ' 
                    + server.address().address + ':' + server.address().port, 'green', 'Server');
            }
        });
    },
    instance,
    server
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytes-crafter.com"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2018.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////