//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytes-crafter.com"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2018.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//#region INITIALIZED NPM INCLUDED MODULES. Done!

	//Access current system information such as os, cpu, ram, etc.
	const system = require('os');
		exports.system = system;

	//Includes clustering library to take advantage of cpu count.
    const cluster = require('cluster');
		exports.cluster = cluster;

	//Contains the primary information of USocketNet.
    const package = require('../package.json');
		exports.package = package;
		
	//Contains server options in running USocketNet.
	const admin = require('../server_configs/admin.json');
		exports.admin = admin;

	//Contains debug log list of USocketNet.
	const log = require('../server_configs/debug.json');
		exports.log = log;

	//File data server with NedDB, a json structured.
	const data = require('./data');
		exports.data = data;

	//Require logging via console and file.
	const debug = require('./debug');
		exports.debug = debug;

	var web = require('./express');
		exports.web = web;

	var channels = [];
		exports.channels = channels;

	var users = [];
		exports.users = users;

	var find = require('./finder');
		exports.find = find;

	//Server process debugging.
	process.on('uncaughtException', function (uerror) //Show a warning about the uncaught exceptions.
	{
		debug.log('UncaughtException', uerror.stack + ' @ ' + uerror, 'red', 'Server');
	});
	process.stdin.resume(); //Instead of exiting or close server, resume.
	process.on("beforeExit", () => debug.log('BeforeExit', 'Received warning that the node server application is trying to shutdown!', 'red', 'Server'));
	process.on("exit", () => debug.log('Exitting', 'Node server application was shutdown for some reason!', 'red', 'Server'));

	if(admin.cluster)
	{
		//Clustering mechanism
		if (cluster.isMaster)
		{
			//#region CONSOLE HEADER.
				debug.log
				(
					'Initialization', 'USocketNet Server ' + package.version + ' by Bytes Crafter : Running since ' + 
					new Date().toLocaleString() + '.', 'white', 'Server'
				);
			//#endregion
			
			const socket = require('./clusters/master');
		}
		
		else
		{
			const socket = require('./clusters/worker');
		}
	}

	else
	{
		const socket = require('./clusters/worker');
	}
	

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytes-crafter.com"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2018.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////