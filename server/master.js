
const debug = require('./base/debug')();
const core = require('./base/core');
const redis = require('./base/redis')( core.config.server.redis );
  const user = redis.select( core.config.server.redis.database.user );
const instance = require('./base/socketio')( 'master' );
  const conn = instance.connect( 'master' );

instance.sio.on('connection', (socket) => {
  
  //Server logging about the connection on Master Server.
  debug.log('Connection on Master', 'User connect @ port ' + conn.address().port + ' with sid of ' + socket.id, 'white', 'connect');
  
  //Add or Update redis user entry @mid.
  // redis.entry({ wpid: sio.wpid, mid: socket.id }, (res) => {

  // });

    //Called by client that its connected.
    socket.on('connected', (data, cback) => {
      if(typeof cback === 'function') {
        cback( conn.address().port );
      }
    });
  
  //Listens for any server-client disconnection
  socket.on('disconnect', () => {
    //Server logging about the disconnection on Master Server.
    debug.log('Disconnection on Master', 'User disconnect @ port ' + conn.address().port + ' with sid of ' + socket.id, 'white', 'disconnect');

    user.entry({ wpid: instance.wpid, mid: 'undefined' }, (res) => {
      //Make to make the mid undefine on redis to check if user is currently connected.
    });
  });
});