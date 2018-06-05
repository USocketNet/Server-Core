//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytes-crafter.com"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2018.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//INSERTING NEW INSTANCE OF THE SERVER.
//
//CODE: PORT=4100 pm2 start --name v0.9.0-A server.js -- --name v090A
//
//> PORT : Port value should not be used. Use Task Manager -> Network and find the corresponding PID.
//> pm2 : Call or use the global dependency of pm2 npm package.
//> start : Start instance of the following server.js reference.
//> --name IDENTITY : Tag and value of the process name or identity of the instance.
//> server.js : Sample target node js application or server to initiate.
//> -- : Separate pm2 arguments to node js arguments.
//> --name : Name of the Node Js application or Server. 
//

require('./server_library/core');

//OTHER PM2 BASIC COMMAND TO USE.
//
//pm2 save : Save the current process list as dump to be able to restore on computer restart.
//pm2 resurrect : Restart all process list before computer shutdown which has been saved.
//pm2 delete all : Delete all instance of process in the current machine.
//pm2 delete id/index : Delete abrupty the current instance of the Node JS app.
//pm2 stop id/index : Stop the current instance of the Node JS app.
//pm2 start id/index : Start the current instance of the Node JS app.
//pm2 restart id/index : Restart the current instance of the Node JS app.
//pm2 ls : Show all instance of the current machine in tabulated format.
//pm2 show id/index : Show information of the curren instance except port.
//pm2 logs id/index : Show the console logging of the target instance.
//
//FOR MORE INFORMATION OF COMMAND: http://pm2.keymetrics.io/docs/usage/quick-start/
//

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytes-crafter.com"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2018.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////