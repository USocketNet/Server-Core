var express = require('express');
var app = express();
    app.use( express.static( __dirname + '/public_html' ) );
var server = require('http').createServer(app);
const io = require('socket.io').listen(server);
var test = server.listen( process.env.PORT || 3000 );
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));

io.emit('hello', 'to all clients');
io.to('room42').emit('hello', "to all clients in 'room42' room");

io.on('connection', (socket) => {
  console.log('Connected! ' + socket.id + ' @ ' + test.address().port);

  socket.on('connected', (data, cback) => {
    console.log('Connetion from ' + data);
    cback(test.address().port);
  });

  socket.on('messaged', () => {
    console.log('Message from ' + test.address().port);
  });

  socket.on('debuged', (data) => {
    console.log('Debug from ' + data);
  });

  socket.broadcast.emit('hello', 'to all clients except sender catered by');
  socket.to('room42').emit('hello', "to all clients in 'room42' room except sender");
});

console.log('Server started! @' + test.address().port);