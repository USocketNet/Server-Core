const server_type = 'message';
const core = require('usn-core');
const instance = core.socketio.init( server_type );
  const conn = instance.connect( server_type );

  //Prevent client socket connection if condition is not met.
  instance.sio.use( core.syntry.verification );

instance.sio.on('connection', (socket) => {
  
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

  });