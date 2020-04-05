//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytescrafter.net"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2020.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const process = require('process');
const argv = require('minimist')(process.argv.slice(2));

if( typeof argv.master == 'undefined' || typeof argv.chat == 'undefined' || typeof argv.game == 'undefined' ) {
    console.log('Stopping server...');
    process.exit(1);
} else {
    console.log('Starting server...');
    require('./server/master');
    require('./server/chat');
    require('./server/game');
}

console.log(argv.master);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytescrafter.net"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2020.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////