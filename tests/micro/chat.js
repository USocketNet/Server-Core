var express = require('express');
var app = express();
    //Enable this to your server with interface.
    //app.use( express.static( __dirname + '/public_html' ) );
var server = require('http').createServer(app);
const io = require('socket.io').listen(server);
var test = server.listen( process.env.PORT || 6060 );
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));

var redis = require("redis"),
    client = redis.createClient();
client.select(7, function() { /* ... */ });
client.on("error", function (err) {
    console.log("REDIS Error " + err);
});

var svr = {};
  svr.name = 'chat';
//io.emit('hello', 'to all clients');

io.on('connection', (socket) => {
  //Check socket.id of this connection.
  console.log('Connected! ' + socket.id);

  //Called by client that its connected.
  socket.on('connected', (data, cback) => {
    console.log(data);
    
    client.get('globalkey', (err, reply) => {
      if(reply != null)
      {
        client.set('globalkey', reply.toString(), redis.print);
      } 
    });
    client.get('globalkey', (err, reply) => {
      if(reply != null)
      {
        cback('Im from port ' + test.address().port + '. REDIS: ' + reply.toString());
      }
    });
  });

  socket.on('hello', (data) => {
    console.log(data);
    socket.broadcast.emit('hello', 'Hello from ' + svr.name + ' server by ' + socket.id);
  });

  //
  //socket.to('room42').emit('hello', "to all clients in 'room42' room except sender");
});

console.log(svr.name + ' server started! @' + test.address().port);