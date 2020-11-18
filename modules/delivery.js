
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

  //Reference utility scripts.
  const libs = require('usn-libs');

  //Include USocketNet redis & Select databsae for this server.
  const redis = libs.redis.init( utils.config.redis() );
    redis.select(0);

  //Cluster server wide message event.
  let curCluster = '';
  redis.getClusterInfo((reply) => {
    if(reply.success) {
      curCluster = reply.data;
    }
  });
  let serverWideMsgEvent = 'svr-'+curCluster.clid;

  //Send event to USocketNet
  function sendEvent(form, cback)
  {
    //Get all delivert client SID form this delivery user from redis.
    redis.getUserSids(form.wpid, 'delivery', (sids) => {
      if(typeof sids.data !== 'undefined' && typeof sids.data !== 'array' ) {
        if(sids.data.length != 0) {
          sids.data.forEach((sid) => {
            instance.sio.to(sid).emit('notify', form);
          });
          cback('success');
        } else {
          cback('notfound');
        }
      } else {
        cback('failed');
      }
    });
  }

  function isOnline(form, cback)
  {
    //Get all delivert client SID form this delivery user from redis.
    redis.getUserSids(form.wpid, 'delivery', (sids) => {
      if(typeof sids.data !== 'undefined' && typeof sids.data !== 'array' ) {
        if(sids.data.length != 0) {
          cback('success');
        } else {
          cback('offline');
        }
      } else {
        cback('failed');
      }
    });
  }

//Module server RestAPI
instance.http.get('/notify', (req, res) => {
  //Get the body parameter.
  let form = req.query; //POST: body, GET: query

  //Send event to target wpid device.
  sendEvent(form, (result) => {
    res.send(result);
  });
})

instance.http.get('/online', (req, res) => {
  //Get the body parameter.
  let form = req.query; //POST: body, GET: query

  //Send event to target wpid device.
  isOnline(form, (result) => {
    res.send(result);
  });
})

//Socket.IO Client Instance.
instance.sio.on('connection', (socket) => {

  // Called by client that its connected.
  socket.on('connects', (data, cback) => {
    //console.log(JSON.stringify(data));
    if(typeof cback === 'function') {
      cback( conn.address().port );
    }
  });

  // Join the Order Channel.
  socket.on('join', function(orderKey, cback) {
    socket.join(orderKey);
    //console.log('Joined: ' + orderKey);
    cback({ status: 'status' });
  });

  // Send message to the Order Room.
  socket.on('status', function(order, cback) {
    socket.to(order.key).emit('status', order);
    //console.log('Status: ' + order);
    cback({ status: 'status' });
  });

  // Notify wpid device, data.wpid is required.
  socket.on('notify', (form) => {
    sendEvent(form, (result) => {
      //console.log('Notify Result: ' + result);
    });
  });
});