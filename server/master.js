
const debug = require('./base/debug')();
const core = require('./base/core');
const instance = require('./base/socketio')( 'master' );
  const conn = instance.connect( 'master' );

instance.sio.on('connection', (socket) => {
  
  //Server logging about the connection on Master Server.
  debug.log('Connection on Master', 'User #' + socket.wpid + ' connect @ port ' + conn.address().port + ' with sid of ' + socket.id, 'white', 'connect');

    //Called by client that its connected.
    socket.on('connected', (data, cback) => {
      if(typeof cback === 'function') {
        cback( conn.address().port );
      }
    });
  
  //Listens for any server-client disconnection
  socket.on('disconnect', () => {
    //Server logging about the disconnection on Master Server.
    debug.log('Disconnection on Master', 'User #' + socket.wpid + ' disconnect @ port ' + conn.address().port + ' with sid of ' + socket.id, 'white', 'disconnect');

    let redis = core.redis.select(0);
    let sock = { wpid: socket.wpid, sid: socket.id, nsp: 'master' };
    redis.socketDisconnect( sock );
  });
});