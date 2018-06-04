//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytes-crafter.com"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2018.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var mysql = require('mysql'); //database engine.
var alert = require('./debug');
var sv = require('./admin.json'); //contains ther server & mysql var.
var wc = require('./debug.json'); //contains list of log codes.

var conn = mysql.createConnection
({
	host: sv.mysql.hostname,
	user: sv.mysql.username,
	password: sv.mysql.password,
	database: sv.mysql.database
});
    
module.exports = 
{
    init: function()
    {
        //Upload default database [name: mysql_database] structure from local if NOT exist. - Ongoing!
        
        conn.connect( function(connError)
        {
            if (connError)
            {
                alert.log(wc[0].title, wc[0].info + connError.code, 'red', 'MySQL');
            }

            else
            {
                alert.log(wc[1].title, wc[1].info + conn.threadId, 'green', 'MySQL');
            }

            conn.destroy(); //Close connections.
        });
    },

    query: function(queries, callback) //callback(success, result); callback: result.
	{
		conn.connect( function(connError)
		{
			if (!connError)
			{
				conn.query(queries, function (queryError, queryResuLt)
				{
					if(queryError)
					{
                        alert.log(queryError.code, queryError.sqlMessage, 'red', 'MySQL'); //Insert event to database.

                        callback(false, null); //Return a callback with value.
					}
											
					else
					{
                        callback(true, queryResuLt); //Return a callback with value.
					}
				});

				conn.destroy(); //Close connections.
			}
		});
	}
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytes-crafter.com"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2018.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////