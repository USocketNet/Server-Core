
const libs = require('usn-libs');
const core = require('usn-core');
const instance = core.socketio.init( 'match' );
  const conn = instance.connect( 'match' );
  
  instance.sio.on('connection', (socket) => {

    //Server logging about the connection on match Server.
    libs.utils.debug.log('MATCH SERVER', 'User #' + socket.wpid + ' connect @ port ' + conn.address().port + ' with sid of ' + socket.id, 'white', 'connect');

    //Called by client that its connected.
    socket.on('connects', (data, cback) => {
      if(typeof cback === 'function') {
        cback( conn.address().port );
      }
    });

    //Listens for any server-client disconnection
    socket.on('disconnect', () => {
      //Server logging about the disconnection on match Server.
      libs.utils.debug.log('MATCH SERVER', 'User #' + socket.wpid + ' disconnect @ port ' + conn.address().port + ' with sid of ' + socket.id, 'white', 'disconnect');

      // let redis = core.redis.select(0);
      // let sock = { wpid: socket.wpid, sid: socket.id, nsp: 'match' };
      // redis.socketDisconnect(sock);
    });
  });