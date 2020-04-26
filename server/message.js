
const usn = require('usn-utils');
const core = require('./base/core');
const instance = require('./base/socketio')( 'message' );
  const conn = instance.connect( 'message' );

  instance.sio.on('connection', (socket) => {
  
    //Server logging about the connection on message Server.
    usn.debug.log('MESSAGE SERVER', 'User #' + socket.wpid + ' connect @ port ' + conn.address().port + ' with sid of ' + socket.id, 'white', 'connect');
  
    socket.join('msg-pub', () => {});

    //Called by client that its connected.
    socket.on('connects', (data, cback) => {
      //console.log(JSON.stringify(data));
      if(typeof cback === 'function') {
        cback( conn.address().port );
      }
    });
    
      socket.on('pub', (data, cback) => {
        socket.to('msg-pub').emit('pub', { u: socket.nme, s: socket.wpid,  m: data.m, d: new Date().toLocaleString() });
        if(typeof cback === 'function') {
          // 0 = success, 1 = failed
          cback({ status: 0, d: new Date().toLocaleString() });
        }
      });

      socket.on('app', (data, cback) => {
        //If the app secret is found on redis server.
        if(data.aks === 'undefined') {
          socket.broadcast.emit('app', { u: socket.nme, s: socket.wpid,  m: data.m, d: new Date().toLocaleString() });
          cback({ status: 'success' });
        } else {
          cback({ status: 'failed' });
        }
      });

      socket.on('rom', (data, cback) => {
        //Check on redis if there is a room created like same of this id.
        socket.to(data.rom).emit('rom', { u: socket.nme, s: socket.wpid,  m: data.m, d: new Date().toLocaleString() });
        cback({ status: 'success' });
      });

      socket.on('pri', (data, cback) => {
        //Get from redis using wpid and Check if online or not.
        socket.to(data.rcv).emit('pri', { u: socket.nme, s: socket.wpid,  m: data.m, d: new Date().toLocaleString() });
        cback({ status: 'success' });
      });

    //Listens for any server-client disconnectio
    socket.on('disconnect', () => {
      //Server logging about the disconnection on message Server.
      usn.debug.log('MESSAGE SERVER', 'User #' + socket.wpid + ' disconnect @ port ' + conn.address().port + ' with sid of ' + socket.id, 'white', 'disconnect');

      // let redis = core.redis.select(0);
      // let sock = { wpid: socket.wpid, sid: socket.id, nsp: 'message' };
      // redis.socketDisconnect( sock );
    });
  });