
//For testing, copy this.
//debug.log('This is a title!', 'The red brown fox jump over the lazy dog.', 'white', 'test');

var fs = require('fs');

module.exports = 
{
    log: function(title, detail, color, type) //Note: tilteLimit: 49 | detailLimit: 250
    {
		var curLogDate = new Date();
		var pathFile = 'logs/' + type + '.log';

		if (fs.existsSync(pathFile))
		{
		    fs.appendFile
			(
				pathFile, '\n' + ' [ ' + curLogDate.toLocaleString() + ' ] ' + title + ' - ' + detail, (err) => { if(err) throw err; }
			);
		}

		else
		{
			fs.writeFile
			(
				pathFile, ' [ ' + curLogDate.toLocaleString() + ' ] ' + title + ' - ' + detail, (err) => { if(err) throw err; }
			);
		}

		var logColor = '';
		if(color == 'white') { logColor = ''; }
		if(color == 'red') { logColor = '\x1b[31m%s\x1b[0m'; }
		if(color == 'green') { logColor = '\x1b[32m%s\x1b[0m'; }
		if(color == 'yellow') { logColor = '\x1b[33m%s\x1b[0m'; }

		if(logColor == '')
		{
			console.log(' [ ' + curLogDate.toLocaleString() + ' ] ' + title + ' - ' + detail);
		}

		else
		{
			console.log(logColor, ' [ ' + curLogDate.toLocaleString() + ' ] ' + title + ' - ' + detail);
		}
	}
};