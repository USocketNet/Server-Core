
var core = require('./core');
var server = require('./controllers/express')(core);
var redis = require('./controllers/redis')(core, 7);
var socketio = require('./controllers/socketio');
  var sio = socketio.init(core, server, 'chat');
  var con = socketio.conn(core, server, sio, 'chat');

  var conns = 0;
  sio.on('connection', (socket) => {
      conns = conns + 1;
      console.log('Chat - Connection# ' + conns + ' @ port ' + con.address().port + ' with sid of ' + socket.id);
    
      //Called by client that its connected.
      socket.on('connected', (data, cback) => {
        console.log(data);
        if(typeof cback === 'function') {
          cback( con.address().port );
        }
      });
  
      socket.on('chat', (msg, cback) => {
        console.log(' Chat Here: '+msg);
        cback('returnee');
        socket.broadcast.emit('chat', { id: socket.id, msg: msg });
      });

      //Listens for any server-client disconnection
    socket.on('disconnect', () => {
      console.log( 'Chat Disconnected: ' + socket.id );
    });
  });