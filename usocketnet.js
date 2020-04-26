//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytescrafter.net"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2020.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const process = require('process');
const usn = require('usn-utils');
const argv = require('minimist')(process.argv.slice(2));

if( typeof argv.name === 'undefined' || typeof argv.master === 'undefined' || typeof argv.message === 'undefined' || typeof argv.match === 'undefined' ) {
    usn.debug.log('USocketNet-Check-Error', 'Detected no arument for --name, --master, --message, and --match.', 'red', 'usocketnet');
    process.exit(1);
} else {
    usn.debug.log('USocketNet-Check-Success', 'Executing the required server libraries for: ' + argv.name, 'green', 'usocketnet');
    require('./server/master');
    require('./server/message');
    require('./server/match');
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytescrafter.net"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2020.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////