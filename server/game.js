
const debug = require('./base/debug')();
const core = require('./base/core');
const redis = require('./base/redis')( core.config.server.redis );
  const user = redis.select( core.config.server.redis.database.user );
const instance = require('./base/socketio')( 'game' );
  const conn = instance.connect( 'game' );
  
  instance.sio.on('connection', (socket) => {

    //Server logging about the connection on Game Server.
    debug.log('Connection on Game', 'User connect @ port ' + conn.address().port + ' with sid of ' + socket.id, 'white', 'connect');
      
    //Add or Update redis user entry @gid.
    // redis.entry({ wpid: instance.wpid, gid: socket.id }, (res) => {

    // });

    //Listens for any server-client disconnection
    socket.on('disconnect', () => {
      //Server logging about the disconnection on Game Server.
      debug.log('Disconnection on Game', 'User disconnect @ port ' + conn.address().port + ' with sid of ' + socket.id, 'white', 'disconnect');

      user.entry({ wpid: instance.wpid, gid: 'undefined' }, (res) => {
        //Make to make the gib undefine on redis to check if user is currently connected.
      });
    });
  });