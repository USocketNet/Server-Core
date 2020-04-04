
const core = require('./base/core');
const server = require('./base/express')();
const redis = require('./base/redis')( core.config.server.redis );
  const user = redis.select( core.config.server.redis.database.user );
const socketio = require('./base/socketio');
  const sio = socketio.init(core, server, user, 'game');
  const con = socketio.conn(core, server, sio, 'game');
  
  sio.on('connection', (socket) => {

    //Server logging about the connection on Game Server.
    core.debug.log('Connection on Game', 'User connect @ port ' + con.address().port + ' with sid of ' + socket.id, 'white', 'connect');
      
    //Add or Update redis user entry @gid.
    // redis.entry({ wpid: sio.wpid, gid: socket.id }, (res) => {

    // });

    //Listens for any server-client disconnection
    socket.on('disconnect', () => {
      //Server logging about the disconnection on Game Server.
      core.debug.log('Disconnection on Game', 'User disconnect @ port ' + con.address().port + ' with sid of ' + socket.id, 'white', 'disconnect');

      user.entry({ wpid: sio.wpid, gid: 'undefined' }, (res) => {
        //Make to make the gib undefine on redis to check if user is currently connected.
      });
    });
  });