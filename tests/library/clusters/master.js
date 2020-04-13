//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytes-crafter.com"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2018.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const core = require('../core'); //Refererence to the core of the server.

const server = require('http').createServer(); //Make an internal web server.
const io = require('socket.io').listen(server); //Create a new instance of socket.io.
const redis = require('socket.io-redis'); //Create new instance of socket.io redis.
    //Set the redis instance as the main adapter for rooms and clients. Password required!
    io.adapter(redis({ host: 'localhost', port: 6379 }));
    //io.adapter(redis({ host: 'localhost', port: 6379, "auth_pass": "292469101291+" }));

    //setInterval(function()
	//{
		// all workers will receive this in Redis, and emit
	//	socket.io.emit('data', 'payload');
	//}, 1000);

    for (var i = 0; i < core.system.cpus().length; i++)
    {
        if(i < core.admin.clusterCpu)
        {
            core.cluster.fork(); //Add new cluster process in relation to cpu count.
        }
	}
	  
    core.cluster.on('exit', function(worker, code, signal) 
    {
		console.log('worker ' + worker.process.pid + ' died' + ' Code: ' + code + ' Signal: ' + signal);
    });
    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytes-crafter.com"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2018.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////