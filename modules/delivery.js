
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

const server_type = 'delivery';
const core = require('usn-core');
const instance = core.socketio.init();
  //Prevent client socket connection if condition is not met.
  instance.sio.use( core.syntry.verification );
  const conn = instance.connect( server_type );

  //Reference utility scripts.
  const utils = require('usn-utils');

  //Include USocketNet redis & Select databsae for this server.
  const redis = require('usn-libs').redis.init( utils.config.redis() );
    redis.select(0);

  let curCluster = '';
  redis.getClusterInfo((reply) => {
    if(reply.success) {
      curCluster = reply.data;
    }
  });
  let serverWideMsgEvent = 'svr-'+curCluster.clid;

instance.sio.on('connection', (socket) => {
  
  //Called by client that its connected.
  socket.on('connects', (data, cback) => {
    //console.log(JSON.stringify(data));
    if(typeof cback === 'function') {
      cback( conn.address().port );
    }
  });

});
