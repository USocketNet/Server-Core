
const server_type = 'master';
const core = require('usn-core');
const instance = core.socketio.init( server_type );
  const conn = instance.connect( server_type );

//Prevent client socket connection if condition is not met.
instance.sio.use( core.syntry.verification );

instance.sio.on('connection', (socket) => {
  //require('./model/svr-status')(machine, socket);

    //Called by client that its connected.
    socket.on('connects', (data, cback) => {
      if(typeof cback === 'function') {
        cback( conn.address().port );
      }
    });

});