
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

const server_type = 'message';
const core = require('usn-core');
const instance = core.socketio.init();
  //Prevent client socket connection if condition is not met.
  instance.sio.use( core.syntry.verification );
  const conn = instance.connect( server_type );

  const config = require('usn-utils').config;

  //Include USocketNet redis & Select databsae for this server.
  const redis = require('usn-libs').redis.init( config.redis() );
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

  //Automatically join server wide message.
  socket.join(serverWideMsgEvent, () => {});
  socket.on('svr', (data, cback) => {
    socket.to(serverWideMsgEvent).emit('svr', { u: socket.uname, s: socket.wpid,  m: data.m, d: new Date().toLocaleString() });
    if(typeof cback === 'function') {
      cback({ status: 0, d: new Date().toLocaleString() }); // 0 = success, 1 = failed
    }
  });
    
  //ONGOING
  socket.on('prj-join', (data, cback) => {
    socket.join('prj-'+data.pjid, () => {});
    cback({ status: 0 }); // 0 = success, 1 = failed
  });
  socket.on('prj-', (data, cback) => {
    socket.to(serverWideMsgEvent).emit('prj', { u: socket.uname, s: socket.wpid,  m: data.m, d: new Date().toLocaleString() });
    if(typeof cback === 'function') {
      cback({ status: 0, d: new Date().toLocaleString() }); // 0 = success, 1 = failed
    }
  });

  //ONGOING
  socket.on('var-join', (data, cback) => {
    socket.join('var-'+data.var, () => {});
    cback({ status: 0 }); // 0 = success, 1 = failed
  });
  socket.on('var-', (data, cback) => {
    socket.to(serverWideMsgEvent).emit('var', { u: socket.uname, s: socket.wpid,  m: data.m, d: new Date().toLocaleString() });
    if(typeof cback === 'function') {
      cback({ status: 0, d: new Date().toLocaleString() }); // 0 = success, 1 = failed
    }
  });

  //ONGOING
  socket.on('mat-join', (data, cback) => {
    socket.join('mat-'+data.mat, () => {});
    cback({ status: 0 }); // 0 = success, 1 = failed
  });
  socket.on('mat-', (data, cback) => {
    socket.to(serverWideMsgEvent).emit('mat', { u: socket.uname, s: socket.wpid,  m: data.m, d: new Date().toLocaleString() });
    if(typeof cback === 'function') {
      cback({ status: 0, d: new Date().toLocaleString() }); // 0 = success, 1 = failed
    }
  });

  //ONGOING
  socket.on('grp-join', (data, cback) => {
    socket.join('grp-'+data.grp, () => {});
    cback({ status: 0 }); // 0 = success, 1 = failed
  });
  socket.on('grp-', (data, cback) => {
    socket.to(serverWideMsgEvent).emit('grp', { u: socket.uname, s: socket.wpid,  m: data.m, d: new Date().toLocaleString() });
    if(typeof cback === 'function') {
      cback({ status: 0, d: new Date().toLocaleString() }); // 0 = success, 1 = failed
    }
  });

  //#region PRIVATE MESSAGE - WORKING! Need Optimization.
  socket.on('pri', (data, cback) => {

    //Get all message client SID form this data.r(receiver.wpid) from redis.
    redis.getUserSids(data.r, 'message', (sids) => {
      if(typeof sids.data != 'undefined' ) {
        sids.data.forEach((sid) => {
          instance.sio.to(sid).emit('pri', { u: socket.uname, s: socket.wpid,  m: data.m, d: new Date().toLocaleString() });
        });
      }
    });

    //Get all message client SID form this user from redis.
    redis.getUserSids(socket.wpid, 'message', (sids) => {
      if(typeof sids.data != 'undefined' ) {
        sids.data.forEach((sid) => {
          if(sid != socket.id) {
            instance.sio.to(sid).emit('pri', { u: socket.uname, s: socket.wpid,  m: data.m, d: new Date().toLocaleString() });
          }
        });
      }
    });

    cback( { status: 0, d: new Date().toLocaleString() } ); // 0 = success, 1 = failed
  });
  //#endregion PRIVATE MESSAGE

});
