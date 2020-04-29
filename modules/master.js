
/*
    * Package: USocketNet
    * Description: Self-Host Realtime Multiplayer Server 
    *       for your Game or Chat Application.
    * Package-Website: https://usocketnet.bytescrafter.net
    * 
    * Author: Bytes Crafter
    * Author-Website:: https://www.bytescrafter.net/about-us
    * License: Copyright (C) Bytes Crafter - All rights Reserved. 
*/

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
