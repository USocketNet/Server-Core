//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytes-crafter.com"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2018.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var fs = require('fs');

module.exports = {
    read: function(filename, subfolder, callback)
	{
		var returning = {};
			returning.result = 'success';
		var pathFile = 'server_library/configs/';
			for(var sf = 0; sf < subfolder.length; sf++)
			{
				pathFile = subfolder[sf] + '/';
			}
			pathFile = pathFile + filename + '.json';
		
		if (fs.existsSync(pathFile))
		{
			fs.open
			(
				pathFile, function(err, data)
				{
					if(err)
					{
						returning.result = err;
					}

					else
					{
						returning.content = data;
					}

					callback(returning);
				}
			);
		}

		else
		{
			returning.result = 'notfound';
			callback(returning);
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