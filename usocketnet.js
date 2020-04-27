//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "usocketnet.bytescrafter.net"    							//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2020.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const usn = require('usn-utils');
const argv = require('minimist')(process.argv.slice(2));

if( typeof argv.master === 'undefined' || typeof argv.message === 'undefined' || typeof argv.match === 'undefined' || typeof argv.game === 'undefined' ) {
    usn.debug.log('USocketNet-Check-Error', 'Detected no arument for --master, --message, --match, and --game.', 'red', 'usocketnet');
    process.exit(1);
} else {
    usn.debug.log('USocketNet-Check-Success', 'Executing the required server core for: ' + argv.name, 'green', 'usocketnet');
    require('./modules/master');
    require('./modules/message');
    require('./modules/match');
    require('./modules/game');
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "usocketnet.bytescrafter.net"    							//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2020.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////