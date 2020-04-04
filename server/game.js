
const debug = require('./base/debug')();
const core = require('./base/core');
const instance = require('./base/socketio')( 'game' );
  const conn = instance.connect( 'game' );
  
  instance.sio.on('connection', (socket) => {

    //Server logging about the connection on Game Server.
    debug.log('Connection on Game', 'User #' + socket.wpid + ' connect @ port ' + conn.address().port + ' with sid of ' + socket.id, 'white', 'connect');

    //Listens for any server-client disconnection
    socket.on('disconnect', () => {
      //Server logging about the disconnection on Game Server.
      debug.log('Disconnection on Game', 'User #' + socket.wpid + ' disconnect @ port ' + conn.address().port + ' with sid of ' + socket.id, 'white', 'disconnect');

      let redis = core.redis.select(0);
      let sock = { wpid: socket.wpid, sid: socket.id, nsp: 'game' };
      redis.socketDisconnect(sock);
    });
  });