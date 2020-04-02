
var mysql = require('mysql'); //database engine.
var core = require('../core');
    var config = core.config.admin.mysql;
var conn = mysql.createConnection({
    host: config.host,
    user: config.uname,
    password: config.pword,
    database: config.dbase
});

function init() {
    conn.connect( (connError) => {
        if (connError) {
            core.debug.log('MySql-Init-Error', 'MySQL Server connection check return error. Code: ' + connError.code, 'red', 'mysql');
            // INTERUPT THE WHOLE SERVER EXECUTION. !IMPORTANT
            process.exit(1);
        } else {
            core.debug.log('MySql-Init-Success', 'MySQL Server connection check was successful on Thread Id: ' + + conn.threadId, 'green', 'mysql');
        } //conn.destroy(); //Close connections.
    });
} module.exports.init = init;

function query( queries, cback ) {
    conn.query(queries, function (queryError, queryResuLt) {
        if(!queryError) {
            cback(true, queryResuLt); //Return a callback with value.
        } else {
            core.debug.log(queryError.code, queryError.sqlMessage, 'red', 'mysql'); //Insert event to database.
            cback(false, null); //Return a callback with value.
        }
    });
} module.exports.query = query;
