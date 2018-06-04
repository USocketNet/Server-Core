//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytes-crafter.com"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2018.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//#region INITIALIZED NPM INCLUDED MODULES. Done!

	//Access current system information such as os, cpu, ram, etc.
	const sys = require('os');
		exports.system = sys;

	//Includes clustering library to take advantage of cpu count.
    const clt = require('cluster');
		exports.cluster = clt;

	//Contains the primary information of USocketNet.
    const pkg = require('../package.json');
		exports.package = pkg;
		
	//Contains server options in running USocketNet.
	const adm = require('../server_configs/admin.json');
		exports.admin = adm;

	//Contains debug log list of USocketNet.
	const log = require('../server_configs/debug.json');
		exports.logs = log;

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

	//Clustering mechanism
	if (clt.isMaster)
	{
		//#region CONSOLE HEADER.
			console.log
			(
				'\x1b[36m%s\x1b[0m',
				'////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////' + '\n' +
				'//                                                                                                                        //' + '\n' +
				'//         USocketNet Server ' + pkg.version + ' by Bytes Crafter @ Copyrights 2018 : Server running as of ' + new Date().toLocaleString() + '          //' + '\n' +
				'//                                                                                                                        //' + '\n' +
				'////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////' + '\n'
			);
		//#endregion
		
		const socket = require('./clusters/master');
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