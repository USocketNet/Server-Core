
const debug = require('./base/debug')();
const core = require('./base/core');
const instance = require('./base/socketio')( 'chat' );
  const conn = instance.connect( 'chat' );

  instance.sio.on('connection', (socket) => {
  
    //Server logging about the connection on Chat Server.
    debug.log('Connection on Chat', 'User #' + socket.wpid + ' connect @ port ' + conn.address().port + ' with sid of ' + socket.id, 'white', 'connect');
  
    socket.join('chat-pub', () => {
      //let rooms = Object.keys(socket.rooms);
      //console.log(rooms); // [ <socket.id>, 'room 237' ]
    });

    //Called by client that its connected.
    socket.on('connects', (data, cback) => {
      //console.log(JSON.stringify(data));
      if(typeof cback === 'function') {
        cback( conn.address().port );
      }
    });
    
      socket.on('pub', (data, cback) => {
        socket.to('chat-pub').emit('pub', { nme: socket.nme, snd: socket.wpid,  msg: data.msg, date: new Date().toLocaleString() });
        cback({ status: 'success' });
      });

      socket.on('app', (data, cback) => {
        //If the app secret is found on redis server.
        if(data.aks === 'undefined') {
          socket.broadcast.emit('app', { nme: socket.nme, snd: socket.wpid,  msg: data.msg, date: new Date().toLocaleString() });
          cback({ status: 'success' });
        } else {
          cback({ status: 'failed' });
        }
      });

      socket.on('rom', (data, cback) => {
        //Check on redis if there is a room created like same of this id.
        socket.to(data.rom).emit('rom', { nme: socket.nme, snd: socket.wpid,  msg: data.msg, date: new Date().toLocaleString() });
        cback({ status: 'success' });
      });

      socket.on('pri', (data, cback) => {
        //Get from redis using wpid and Check if online or not.
        socket.to(data.rcv).emit('pri', { nme: socket.nme, snd: socket.wpid,  msg: data.msg, date: new Date().toLocaleString() });
        cback({ status: 'success' });
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