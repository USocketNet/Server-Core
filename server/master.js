
const debug = require('./base/debug')();
const core = require('./base/core');
const instance = require('./base/socketio')( 'master' );
  const conn = instance.connect( 'master' );

  const machine = [];
  setInterval(() => {
    machine.push( {
      //Add object here...
      cpu: getCpuUsagePercent(),
      ram: getRamUsageInMB()
    });

    if( machine.length > 30 ) {
      machine.shift();
    }
  }, 1000);

  let cpuUse = 'undefined';
  function getCpuUsagePercent() {
    if( cpuUse != 'undefined' ) {
      cpuUse = process.cpuUsage(cpuUse);
    } else {
      cpuUse = process.cpuUsage();
    }
    
    return { user: Math.round( cpuUse.user/1000 ), system: Math.round( cpuUse.system/1000 ) };
  }

  function getRamUsageInMB() {
    ramUse = process.memoryUsage();    
    return { used: Math.round( ramUse.heapUsed/1024/1024 ), total: Math.round( ramUse.heapTotal/1024/1024 ) };
  }


instance.sio.on('connection', (socket) => {
  require('./model/svr-status')(machine, socket);
  
  //Server logging about the connection on Master Server.
  debug.log('Connection on Master', 'User #' + socket.wpid + ' connect @ port ' + conn.address().port + ' with sid of ' + socket.id, 'white', 'connect');

    //Called by client that its connected.
    socket.on('connects', (data, cback) => {
      if(typeof cback === 'function') {
        cback( conn.address().port );
      }
    });
  
  //Listens for any server-client disconnection
  socket.on('disconnect', (reason) => {
    /* reason = values:
      transport error	                Server Side	    Transport error
      server namespace disconnect	    Server Side	    Server performs a socket.disconnect()
      client namespace disconnect	    Client Side	    Got disconnect packet from client
      ping timeout	                  Client Side	    Client stopped responding to pings in the allowed amount of time (per the pingTimeout config setting)
      transport close	                Client Side	    Client stopped sending data
    */
    //Server logging about the disconnection on Master Server.
    debug.log('Disconnection on Master', 'User #' + socket.wpid + ' disconnect @ port ' + conn.address().port + ' with sid of ' + socket.id + ' - ' + reason, 'white', 'disconnect');

    // let redis = core.redis.select(0);
    // let sock = { wpid: socket.wpid, sid: socket.id, nsp: 'master' };
    // redis.socketDisconnect( sock );
  });

  socket.on('error', (error) => {
    debug.log('Connection Error on Master', 'User #' + socket.wpid + ' disconnect @ port ' + conn.address().port + ' with sid of ' + socket.id + ' - ' + error, 'white', 'disconnect');
  });
});