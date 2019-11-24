
var core = require('./core');
var server = require('./controllers/express')(core);
var redis = require('./controllers/redis')(core, 7);
var socketio = require('./controllers/socketio');
  var sio = socketio.init(core, server, 'master');
  var con = socketio.conn(core, server, sio, 'master');

var conns = 0;
sio.on('connection', (socket) => {
    conns = conns + 1;
    console.log('Master Connection: ' + conns + ' @ port ' + con.address().port);
    //Check socket.id of this connection.
    console.log('Master Connected! ' + socket.id);
  
    //Called by client that its connected.
    socket.on('connected', (data, cback) => {
      console.log(data);
      if(typeof cback === 'function') {
        cback( con.address().port );
      }
    });
  
    socket.on('hello', (data) => {
      console.log(data);
      socket.broadcast.emit('hello', 'Hello from master server by ' + socket.id);
    });
});