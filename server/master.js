
var core = require('./core');
var server = require('./controllers/express')(core);
var redis = require('./controllers/redis').init(core, 'master');
var socketio = require('./controllers/socketio');
  var sio = socketio.init(core, server, 'master');
  var con = socketio.conn(core, server, sio, 'master');

sio.on('connection', (socket) => {
  
  //Server logging about the connection on Master Server.
  core.debug.log('Connection on Master', 'User connect @ port ' + con.address().port + ' with sid of ' + socket.id, 'white', 'connect');
  
  //Add or Update redis user entry @mid.
  redis.entry({ wpid: sio.wpid, mid: socket.id }, (res) => {

  });

    //Called by client that its connected.
    socket.on('connected', (data, cback) => {
      if(typeof cback === 'function') {
        cback( con.address().port );
      }
    });
  
  //Listens for any server-client disconnection
  socket.on('disconnect', () => {
    //Server logging about the disconnection on Master Server.
    core.debug.log('Disconnection on Master', 'User disconnect @ port ' + con.address().port + ' with sid of ' + socket.id, 'white', 'disconnect');

    redis.entry({ wpid: sio.wpid, mid: 'undefine' }, (res) => {
      //Make to make the mid undefine on redis to check if user is currently connected.
    });
  });
});