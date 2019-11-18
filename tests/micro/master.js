var express = require('express');
var app = express();
    //Enable this to your server with interface.
    //app.use( express.static( __dirname + '/public_html' ) );
var server = require('http').createServer(app);
const io = require('socket.io').listen(server);
var test = server.listen( process.env.PORT || 19090 );
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));

var svr = {};
  svr.name = 'master';
  svr.users = [];
//io.emit('hello', 'to all clients');

var Redis = require("ioredis");
var redis = new Redis({db: 7});

redis.set("server", JSON.stringify(svr));
redis.hmset('chan0', svr );

// #region redis sample
// var pub = new Redis({db: 7});
// redis.subscribe("news", "connected", function(err, count) {
//   // Now we are subscribed to both the 'news' and 'music' channels.
//   // `count` represents the number of channels we are currently subscribed to.
//   console.log('Count Redis: ' + count);
// });
// pub.publish("news", "Hello world1!"); //Call this and next function will be called if registered above!
// redis.on("message", function(channel, message) {
//   // Receive message Hello world! from channel news
//   // Receive message Hello again! from channel music
//   console.log("Receive message %s from channel %s", message, channel);
// });
// redis.get("foo", function(err, result) {
//   console.log('Redis Value: ' + result);
// });
// #endregion

io.on('connection', (socket) => {
  //Check socket.id of this connection.
  console.log('Connected! ' + socket.id);

  //Called by client that its connected.
  socket.on('connected', (data, cback) => {
    console.log(data);
    cback('Im from port ' + test.address().port + '. REDIS: ');
  });

  socket.on('hello', (data) => {
    console.log(data);
    socket.broadcast.emit('hello', 'Hello from ' + svr.name + ' server by ' + socket.id);
  });

  //
  //socket.to('room42').emit('hello', "to all clients in 'room42' room except sender");
});

console.log(svr.name + ' server started! @' + test.address().port);