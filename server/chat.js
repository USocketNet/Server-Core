
const core = require('./base/core');
const server = require('./base/express')();
const redis = require('./base/redis')( core.config.server.redis );
  const user = redis.select( core.config.server.redis.database.user );
const socketio = require('./base/socketio');
  const sio = socketio.init(core, server, user, 'chat');
  const con = socketio.conn(core, server, sio, 'chat');

  sio.on('connection', (socket) => {
  
    //Server logging about the connection on Chat Server.
    core.debug.log('Connection on Chat', 'User connect @ port ' + con.address().port + ' with sid of ' + socket.id, 'white', 'connect');
    
    //Add or Update redis user entry @cid.
    // redis.entry({ wpid: sio.wpid, cid: socket.id }, (res) => {

    // });
  
      socket.on('chat', (msg, cback) => {
        cback('returnee');
        socket.broadcast.emit('chat', { wpid: sio.wpid, sid: socket.id,  msg: msg });
      });

    //Listens for any server-client disconnectio
    socket.on('disconnect', () => {
      //Server logging about the disconnection on Chat Server.
      core.debug.log('Disconnection on Chat', 'User disconnect @ port ' + con.address().port + ' with sid of ' + socket.id, 'white', 'disconnect');

      user.entry({ wpid: sio.wpid, cid: 'undefined' }, (res) => {
        //Make to make the cid undefine on redis to check if user is currently connected.
      });
    });
  });