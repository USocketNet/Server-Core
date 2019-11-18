
var core = require('./core');
var server = require('./controllers/express')(core);
var redis = require('./controllers/redis')(core, 7);
var socketio = require('./controllers/socketio')(core, server);

var conn = server.listen( process.env.PORT || 19091, 'localhost', function(err) {
    if (err) {
        core.debug.log('Master Server Init', 'Server failed to initialized.', 'red', 'master');
    } else {
        core.debug.log('Master Server Init', 'Server is now running...', 'green', 'master');
    }
});

socketio.on('connection', (socket) => {
    //Check socket.id of this connection.
    console.log('Connected! ' + socket.id);
  
    //Called by client that its connected.
    socket.on('connected', (data, cback) => {
      console.log(data);
      cback('Im from port ' + conn.address().port + '. REDIS: ');
    });
  
    socket.on('hello', (data) => {
      console.log(data);
      socket.broadcast.emit('hello', 'Hello from server by ' + socket.id);
    });
});