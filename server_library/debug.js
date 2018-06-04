//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytes-crafter.com"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2018.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Require file system module.
var fs = require('fs');

//Require core of USocketNet.
var core = require('./core');

module.exports = 
{
	log: function(title, detail, color, type) //Note: tilteLimit: 49 | detailLimit: 250
    {
		var curLogDate = new Date();
		var curLogName = type + '@' + curLogDate.getFullYear();
		var pathFile = 'server_library/text_logs/' + curLogName + '.txt';

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
	},
	
	upload: function(jsonObject) //logDataTrafficUp
	{
		var latestTraffic = {};
			latestTraffic.timeLogged = new Date().toTimeString().split(' ')[0];
			latestTraffic.totalSize = Buffer.byteLength(JSON.stringify(jsonObject), 'utf8') * 8;

		var didFoundGrouped = false;

		for(idataup = 0; idataup < core.data.stats.trafficUp.length; idataup++)
		{
			if(core.data.stats.trafficUp[idataup].timeLogged == latestTraffic.timeLogged)
			{
				core.data.stats.trafficUp[idataup].totalSize += Buffer.byteLength(JSON.stringify(jsonObject), 'utf8') * 8;
				didFoundGrouped = true;
			}
		}

		if(didFoundGrouped == false)
		{
			if(core.data.stats.trafficUp.length > 30)
			{
				core.data.stats.trafficUp.splice(0, 1);
			}

			core.data.stats.trafficUp.push(latestTraffic);
		}
	},

	download: function(jsonObject) //logDataTrafficDown
	{
		var latestTraffic = {};
			latestTraffic.timeLogged = new Date().toTimeString().split(' ')[0];
			latestTraffic.totalSize = Buffer.byteLength(JSON.stringify(jsonObject), 'utf8') * 8;

		var didFoundGrouped = false;

		for(idatadown = 0; idatadown < core.data.stats.trafficDown.length; idatadown++)
		{
			if(core.data.stats.trafficDown[idatadown].timeLogged == latestTraffic.timeLogged)
			{
				core.data.stats.trafficDown[idatadown].totalSize += Buffer.byteLength(JSON.stringify(jsonObject), 'utf8') * 8;
				didFoundGrouped = true;
			}
		}

		if(didFoundGrouped == false)
		{
			if(core.data.stats.trafficDown.length > 30)
			{
				core.data.stats.trafficDown.splice(0, 1);
			}

			core.data.stats.trafficDown.push(latestTraffic);
		}
	}
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytes-crafter.com"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2018.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////