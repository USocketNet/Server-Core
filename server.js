//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytescrafter.net"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2020.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const process = require('process');
const debug = require('./server/base/debug')();
const argv = require('minimist')(process.argv.slice(2));

if( typeof argv.name === 'undefined' || typeof argv.master === 'undefined' || typeof argv.chat === 'undefined' || typeof argv.game === 'undefined' ) {
    debug.log('USocketNet-Check-Error', 'Detected no arument for --name, --master, --chat, and --game.', 'red', 'usocketnet');
    process.exit(1);
} else {
    debug.log('USocketNet-Check-Success', 'Executing the required server libraries for: ' + argv.name, 'green', 'usocketnet');
    require('./server/master');
    require('./server/chat');
    require('./server/game');
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytescrafter.net"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2020.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////