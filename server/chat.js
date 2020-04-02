
var core = require('./core');
var server = require('./controllers/express')(core);
var redis = require('./controllers/redis').init(core, 'chat');
var socketio = require('./controllers/socketio');
  var sio = socketio.init(core, server, 'chat');
  var con = socketio.conn(core, server, sio, 'chat');

  var conns = 0;
  sio.on('connection', (socket) => {
      conns = conns + 1;
      console.log('Chat - Connection# ' + conns + ' @ port ' + con.address().port + ' with sid of ' + socket.id);
    
      //Add or Update redis user entry @cib.
      redis.newConn({ wpid: sio.wpid, cib: socket.id }, (res) => {

      });

      //Called by client that its connected.
      socket.on('connected', (data, cback) => {
        // redis.addUser( curUser, ( result ) => {
          
        //   if( result.status == 'success' ) {

        //   } else {
            
        //   }
        // });
        // if(typeof cback === 'function') {
        //   cback( curUser );
        // }
      });
  
      socket.on('chat', (msg, cback) => {
        cback('returnee');
        socket.broadcast.emit('chat', { wpid: curUser.wpid, sid: socket.id,  msg: msg });
      });

      //Listens for any server-client disconnectio
    socket.on('disconnect', () => {
      console.log( 'Chat Disconnected: ' + socket.id );
    });
  });