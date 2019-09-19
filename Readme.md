
# USocketNet - Server

The USocketNet is currently designed and developed for Unity Engine. It is a multi-platform that can be used through mobile or standalone computers. The developers advised the users to report any issues or bugs immediately to further improve our services. We are driven to develop more and add new powerful features. We are positively driven to improve more and add new powerful features.

## Features

USocketNet enables real-time bidirectional event-based communication. It consists in:

- Realtime WebSocket Connection.
- Host your own server.
- Cross-Platform with Unity.
- Reconnect Client Event.
- Realtime Admin Page.
- Server Health Monitoring.
- Flexible and Scalable.
- Matchmaking Mechanism.
- Any Gameplay Compatible.

## Requirements

- [WordPress - Frontend & Backend Interface](https://www.nginx.com/)
- [Redis - In Memory Database](https://redis.io/)
- [Nginx - Web Serving & Load Balancing(Optional)](https://www.wordpress.org/)
- [MySQL - Regular Database](https://dev.mysql.com/downloads/mysql/)

NPM packages on Global:

- [pm2 - v2.10.4](https://www.npmjs.com/package/pm2)

NPM packages on USE:

- [socket.io - v2.1.1](https://www.npmjs.com/package/socket.io)
- [express - v4.16.3](https://www.npmjs.com/package/express)
- [body-parser v1.18.3](https://www.npmjs.com/package/body-parser)
- [swagger-stats - v0.95.5](https://www.npmjs.com/package/swagger-stats)

NPM packages on PARTIAL:

- [nedb - v2.8.4](https://www.npmjs.com/package/nedb)
- [socket.io-redis - v5.2.0](https://www.npmjs.com/package/socket.io-redis)

NPM packages on RESERVED:

- [cors - v2.8.4](https://www.npmjs.com/package/cors)
- [crc - v3.5.0](https://www.npmjs.com/package/crc)
- [crypto-js v3.1.9-1](https://www.npmjs.com/package/crypto-js)
- [mysql - v2.15.0](https://www.npmjs.com/package/mysql)
- [nodemailer - v4.6.5](https://www.npmjs.com/package/nodemailer)
- [redis - v2.8.0](https://www.npmjs.com/package/redis)

Its main features are:

#### Reliability

Connections are established even in the presence of:
  - proxies and load balancers with Nginx Server.
  - personal firewall and antivirus software by Socket.IO.
  - in memory json data cache with Redis Server.
  - multi instancing and keymetrics by npm PM2.
  - easy npm devDependencies updates NPM npm-gui.

For this purpose, it relies on [Engine.IO](https://github.com/socketio/engine.io), which first establishes a long-polling connection, then tries to upgrade to better transports that are "tested" on the side, like WebSocket. Please see the [Goals](https://github.com/socketio/engine.io#goals) section for more information.

#### Auto-reconnection support

Unless instructed otherwise a disconnected client will try to reconnect forever, until the server is available again. Please see the available reconnection options [here](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#new-managerurl-options).

#### Disconnection detection

A heartbeat mechanism is implemented at the Engine.IO level, allowing both the server and the client to know when the other one is not responding anymore.
That functionality is achieved with timers set on both the server and the client, with timeout values (the `pingInterval` and `pingTimeout` parameters) shared during the connection handshake. Those timers require any subsequent client calls to be directed to the same server, hence the `sticky-session` requirement when using multiples nodes.

#### Room support

Within each `Server`, you can define arbitrary channels, called `Channel`, that sockets can join and leave. You can then broadcast to any given channel, reaching every socket that has joined it.

This is a useful feature to send notifications to a group of users, or to a given user connected on several devices for example.

**Note:** USocketNet is not a WebSocket implementation. Although USocketNet indeed uses WebSocket as a transport when possible, it adds some metadata to each packet: the packet type, the namespace and the ack id when a message acknowledgement is needed. That is why a WebSocket client will not be able to successfully connect to a USocketNet server, and a USocketNet client will not be able to connect to a WebSocket server (like `ws://echo.websocket.org`) either.

## Official Website

- [Learn More or About](http://usocket.bytes-crafter.com/index.php)
- [Buy an Official Copy](https://www.bytes-crafter.com/index.php?rt=product/product&product_id=20)

## Contributors

Become an official contributor and get your photo on our README with a link to your profile. [[Become a contributor](https://mail.google.com/mail/u/0/?view=cm&fs=1&to=bytescrafter@gmail.com&su=USocketNet%20Contributors&body=Type%20Here.&tf=1)]

<a href="https://www.linkedin.com/in/caezar-ii-de-castro-302945140/" target="_blank"><img src="https://media.licdn.com/dms/image/C5603AQFK6jxIOWfiBA/profile-displayphoto-shrink_200_200/0?e=1533772800&v=beta&t=UNo9owDHWsDp47Ka4SgM_LGE42_Lw4W3gDkmNyPdo-o"></a>

## License

[MIT](Raw/LICENSE?display=True)