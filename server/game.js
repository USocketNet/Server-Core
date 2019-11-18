
var core = require('./core');
var server = require('./controllers/express')(core);
var redis = require('./controllers/redis')(core, 7);
var socketio = require('./controllers/socketio')(core, server);

var conn = server.listen( process.env.PORT || 9091, 'localhost', function(err) {
    if (err) {
        core.debug.log('Game Server Init', 'Server failed to initialized.', 'red', 'game');
    } else {
        core.debug.log('Game Server Init', 'Server is now running...', 'green', 'game');
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