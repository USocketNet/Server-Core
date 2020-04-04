
const debug = require('./base/debug')();
const core = require('./base/core');
const instance = require('./base/socketio')( 'chat' );
  const conn = instance.connect( 'chat' );

  instance.sio.on('connection', (socket) => {
  
    //Server logging about the connection on Chat Server.
    debug.log('Connection on Chat', 'User #' + socket.wpid + ' connect @ port ' + conn.address().port + ' with sid of ' + socket.id, 'white', 'connect');
  
      socket.on('public', (msg, cback) => {
        cback('returnee');
        socket.broadcast.emit('public', { nme: socket.nme, snd: socket.wpid,  msg: msg, date: new Date() });
      });

    //Listens for any server-client disconnectio
    socket.on('disconnect', () => {
      //Server logging about the disconnection on Chat Server.
      debug.log('Disconnection on Chat', 'User #' + socket.wpid + ' disconnect @ port ' + conn.address().port + ' with sid of ' + socket.id, 'white', 'disconnect');

      let redis = core.redis.select(0);
      let sock = { wpid: socket.wpid, sid: socket.id, nsp: 'chat' };
      redis.socketDisconnect( sock );
    });
  });