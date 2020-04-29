
/*
    * Package: USocketNet
    * Description: Self-Host Realtime Multiplayer Server 
    *       for your Game or Chat Application.
    * Package-Website: https://usocketnet.bytescrafter.net
    * 
    * Author: Bytes Crafter
    * Author-Website:: https://www.bytescrafter.net/about-us
    * License: Copyright (C) Bytes Crafter - All rights Reserved. 
*/

//debug.log('This is a title!', 'The red brown fox jump over the lazy dog.', 'white', 'test');
class usn_debug {
	
	/**
     * During instantiation of usn_debug class, a constructor is 
     * invoked which needs 0 parameter.
     */
	constructor () {
		//Include nodejs file system.
		this.fs = require('fs');

		//Include usn_config class to retrive config json.
		this.config = require('./config').init();
	}
	
	/**
	 * Leave a console log and also file log located at Logs/{type}.log
	 * Note Standard Limits: tilte: 25 | detailLimit: 75
	 * @param  {} title
	 * @param  {} detail
	 * @param  {} color
	 * @param  {} type
	 */
	log (title, detail, color, type)
    {
		//Get the current datetime of this log.
		let curLogDate = new Date();

		//Check if the logging on file is enabled or not.
		if( this.config.safe('logging.file', false) ) {

			//Create Logs/ directory if not existed.
			try {
				this.fs.mkdirSync('logs');
			} catch(err) {
				if(err.code == 'EEXIST') {
					//Directory already exist, just continue.
				}
			}

			//Set the parent path of the log.
			let pathFile = 'logs/' + type + '.log';

			//Write new file or edit and append log.
			if (this.fs.existsSync(pathFile)) {
				this.fs.appendFile(
					pathFile, '\n' + ' [ ' + curLogDate.toLocaleString() + ' ] ' + title + ' - ' + detail, (err) => { if(err) throw err; }
				);
			} else {
				this.fs.writeFile
				(
					pathFile, ' [ ' + curLogDate.toLocaleString() + ' ] ' + title + ' - ' + detail, (err) => { if(err) throw err; }
				);
			}
		}

		//Check if the logging on console is enabled or not.
		if( this.config.safe('logging.console', false) ) {
			//Set color holder default which is white.
			let logColor = 'undefined'; 
			switch( color ) {
				case 'white':
					logColor = 'undefined';
					break;
				case 'red':
					logColor = '\x1b[31m%s\x1b[0m';
					break;
				case 'green':
					logColor = '\x1b[32m%s\x1b[0m';
					break;
				case 'yellow':
					logColor = '\x1b[33m%s\x1b[0m';
					break;
				default:
			}

			//Console logging if logColor is undefined, make it white else use the logColor.
			if(logColor == 'undefined') {
				console.log(' [ ' + curLogDate.toLocaleString() + ' ] ' + title + ' - ' + detail);
			} else {
				console.log(logColor, ' [ ' + curLogDate.toLocaleString() + ' ] ' + title + ' - ' + detail);
			}
		}

	}
}

/**
 * Initialized USN multi-logging class.
 * @param  {} =>{ return new usn_debug() }
 */
module.exports.init = () => {
	return new usn_debug();
}