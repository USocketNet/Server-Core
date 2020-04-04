
const mysql = require('mysql');
const debug = require('./debug');

module.exports = ( config ) => {
    return new usn_mysql( config );
};

class usn_mysql {

    conn = null;

    constructor ( conf ) {
        this.conn = mysql.createConnection({
            host: conf.host,
            user: conf.uname,
            password: conf.pword,
            database: conf.dbase
        });

        this.conn.connect( (connError) => {
            if (connError) {
                debug.log('MySql-Init-Error', 'MySQL Server connection check return error. Code: ' + connError.code, 'red', 'mysql');
                process.exit(1); // INTERUPT THE WHOLE SERVER EXECUTION. !IMPORTANT
            } else {
                debug.log('MySql-Init-Success', 'MySQL Server connection check was successful on Thread Id: ' + + this.conn.threadId, 'green', 'mysql');
            } //conn.destroy(); //Close connections.
        });

        return this.conn; 
    }

    query ( queries, cback ) {
        this.conn.query(queries, function (queryError, queryResuLt) {
            if(!queryError) {
                cback(true, queryResuLt);
            } else {
                debug.log(queryError.code, queryError.sqlMessage, 'red', 'mysql'); //Insert event to database.
                cback(false, null);
            }
        });
    }
}
