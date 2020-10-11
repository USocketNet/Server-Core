
/*
    * Package: USocketNet
    * Description: Multipurpose Realtime Server for your 
    *   Multiplayer Game, Chat App, or Delivery App.
    * Package-Website: https://usocketnet.bytescrafter.net
    * 
    * Author: Bytes Crafter
    * Author-Website:: https://www.bytescrafter.net/about-us
    * License: Copyright (C) Bytes Crafter - All rights Reserved. 
*/

const server_type = 'master';
const core = require('usn-core');
const instance = core.socketio.init();
  //Prevent client socket connection if condition is not met.
  instance.sio.use( core.syntry.verification );
  const conn = instance.connect( server_type );

instance.sio.on('connection', (socket) => {
  //require('./model/svr-status')(machine, socket);

    //Called by client that its connected.
    socket.on('connects', (data, cback) => {
      if(typeof cback === 'function') {
        cback( conn.address().port );
      }
    });

});
