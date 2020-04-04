
const debug = require('./base/debug')();
const core = require('./base/core');
const redis = require('./base/redis')( core.config.server.redis );
  const user = redis.select( core.config.server.redis.database.user );
const instance = require('./base/socketio')( 'chat' );
  const conn = instance.connect( 'chat' );

  instance.sio.on('connection', (socket) => {
  
    //Server logging about the connection on Chat Server.
    debug.log('Connection on Chat', 'User connect @ port ' + conn.address().port + ' with sid of ' + socket.id, 'white', 'connect');
    
    //Add or Update redis user entry @cid.
    // redis.entry({ wpid: instance.wpid, cid: socket.id }, (res) => {

    // });
  
      socket.on('public', (msg, cback) => {
        cback('returnee');
        socket.broadcast.emit('public', { nme: instance.nme, snd: instance.wpid,  msg: msg, date: new Date() });
      });

    //Listens for any server-client disconnectio
    socket.on('disconnect', () => {
      //Server logging about the disconnection on Chat Server.
      debug.log('Disconnection on Chat', 'User disconnect @ port ' + conn.address().port + ' with sid of ' + socket.id, 'white', 'disconnect');

      user.entry({ wpid: instance.wpid, cid: 'undefined' }, (res) => {
        //Make to make the cid undefine on redis to check if user is currently connected.
      });
    });
  });