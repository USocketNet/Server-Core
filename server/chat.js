
var core = require('./core');
var server = require('./controllers/express')(core);
var redis = require('./controllers/redis').init(core, 'chat');
var socketio = require('./controllers/socketio');
  var sio = socketio.init(core, server, 'chat');
  var con = socketio.conn(core, server, sio, 'chat');

  sio.on('connection', (socket) => {
  
    //Server logging about the connection on Chat Server.
    core.debug.log('Connection on Chat', 'User connect @ port ' + con.address().port + ' with sid of ' + socket.id, 'white', 'connect');
    
    //Add or Update redis user entry @cid.
    redis.entry({ wpid: sio.wpid, cid: socket.id }, (res) => {

    });
  
      socket.on('chat', (msg, cback) => {
        cback('returnee');
        socket.broadcast.emit('chat', { wpid: curUser.wpid, sid: socket.id,  msg: msg });
      });

    //Listens for any server-client disconnectio
    socket.on('disconnect', () => {
      //Server logging about the disconnection on Chat Server.
      core.debug.log('Disconnection on Chat', 'User disconnect @ port ' + con.address().port + ' with sid of ' + socket.id, 'white', 'disconnect');

      redis.entry({ wpid: sio.wpid, cid: 'undefine' }, (res) => {
        //Make to make the cid undefine on redis to check if user is currently connected.
      });
    });
  });