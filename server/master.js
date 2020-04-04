
const core = require('./base/core');
const server = require('./base/express')();
const redis = require('./base/redis')( core.config.server.redis );
  const user = redis.select( core.config.server.redis.database.user );
const socketio = require('./base/socketio');
  const sio = socketio.init(core, server, user, 'master');
  const con = socketio.conn(core, server, sio, 'master');

sio.on('connection', (socket) => {
  
  //Server logging about the connection on Master Server.
  core.debug.log('Connection on Master', 'User connect @ port ' + con.address().port + ' with sid of ' + socket.id, 'white', 'connect');
  
  //Add or Update redis user entry @mid.
  // redis.entry({ wpid: sio.wpid, mid: socket.id }, (res) => {

  // });

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

    user.entry({ wpid: sio.wpid, mid: 'undefined' }, (res) => {
      //Make to make the mid undefine on redis to check if user is currently connected.
    });
  });
});