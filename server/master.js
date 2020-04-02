
var core = require('./core');
var server = require('./controllers/express')(core);
var redis = require('./controllers/redis').init(core, 'master');
var socketio = require('./controllers/socketio');
  var sio = socketio.init(core, server, 'master');
  var con = socketio.conn(core, server, sio, 'master');

var conns = 0;
sio.on('connection', (socket) => {
  
    conns = conns + 1; //Just a sample code to count connection.
    console.log('Master - Connection# ' + conns + ' @ port ' + con.address().port + ' with sid of ' + socket.id);
  
    //Add or Update redis user entry @mib.
    redis.newConn({ wpid: sio.wpid, mib: socket.id }, (res) => {

    });

    

    //Called by client that its connected.
    socket.on('connected', (data, cback) => {
      var user = JSON.parse(data);
        user.mid = socket.id;
      // redis.addUser( user, ( result ) => {
      //   if( result.status == 'success' ) {

      //   } else {
          
      //   }
      // });
      
      if(typeof cback === 'function') {
        cback( con.address().port );
      }
    });
  
    //Listens for any server-client disconnection
    socket.on('disconnect', () => {
      console.log( 'Master Disconnected: ' + socket.id );
    });
});