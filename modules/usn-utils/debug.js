
const fs = require('fs');

//debug.log('This is a title!', 'The red brown fox jump over the lazy dog.', 'white', 'test');
class usn_debug {
	
	constructor () {
		return this;
	}

	log (title, detail, color, type) //Note: tilteLimit: 49 | detailLimit: 250
    {
		try {
			fs.mkdirSync('logs');
		} catch(err) {
			if(err.code == 'EEXIST') {
				//Just continue.
			}
		}

		var curLogDate = new Date();
		var pathFile = 'logs/' + type + '.log';

		if (fs.existsSync(pathFile)) {
		    fs.appendFile
			(
				pathFile, '\n' + ' [ ' + curLogDate.toLocaleString() + ' ] ' + title + ' - ' + detail, (err) => { if(err) throw err; }
			);
		}

		else {
			fs.writeFile
			(
				pathFile, ' [ ' + curLogDate.toLocaleString() + ' ] ' + title + ' - ' + detail, (err) => { if(err) throw err; }
			);
		}

		var logColor = 'undefined';
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

		if(logColor == 'undefined') {
			console.log(' [ ' + curLogDate.toLocaleString() + ' ] ' + title + ' - ' + detail);
		}

		else {
			console.log(logColor, ' [ ' + curLogDate.toLocaleString() + ' ] ' + title + ' - ' + detail);
		}
	}
}

module.exports.init = () => {
	return new usn_debug();
}