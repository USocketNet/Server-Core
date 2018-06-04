
# USocketNet - Server

The USocketNet is currently designed and developed for Unity Engine. It is a multi-platform that can be used through mobile or standalone computers. The developers advised the users to report any issues or bugs immediately to further improve our services. We are driven to develop more and add new powerful features. We are positively driven to improve more and add new powerful features.

## Features

Socket.IO enables real-time bidirectional event-based communication. It consists in:

- Realtime WebSocket Multiplayer Server for Indie Game Developers.
- It is a multi-platform that can be used through mobile or standalone computers.
- Optional! Host your own server, contact us now.

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
  - proxies and load balancers.
  - personal firewall and antivirus software.

For this purpose, it relies on [Engine.IO](https://github.com/socketio/engine.io), which first establishes a long-polling connection, then tries to upgrade to better transports that are "tested" on the side, like WebSocket. Please see the [Goals](https://github.com/socketio/engine.io#goals) section for more information.

#### Auto-reconnection support

Unless instructed otherwise a disconnected client will try to reconnect forever, until the server is available again. Please see the available reconnection options [here](https://github.com/socketio/socket.io-client/blob/master/docs/API.md#new-managerurl-options).

#### Disconnection detection

A heartbeat mechanism is implemented at the Engine.IO level, allowing both the server and the client to know when the other one is not responding anymore.

That functionality is achieved with timers set on both the server and the client, with timeout values (the `pingInterval` and `pingTimeout` parameters) shared during the connection handshake. Those timers require any subsequent client calls to be directed to the same server, hence the `sticky-session` requirement when using multiples nodes.

#### Binary support

Any serializable data structures can be emitted, including:

- [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) and [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) in the browser
- [ArrayBuffer](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) and [Buffer](https://nodejs.org/api/buffer.html) in Node.js

#### Cross-browser

Browser support is tested in Saucelabs:

[![Sauce Test Status](https://saucelabs.com/browser-matrix/socket.svg)](https://saucelabs.com/u/socket)

#### Multiplexing support

In order to create separation of concerns within your application (for example per module, or based on permissions), Socket.IO allows you to create several `Namespaces`, which will act as separate communication channels but will share the same underlying connection.

#### Room support

Within each `Namespace`, you can define arbitrary channels, called `Rooms`, that sockets can join and leave. You can then broadcast to any given room, reaching every socket that has joined it.

This is a useful feature to send notifications to a group of users, or to a given user connected on several devices for example.

**Note:** USocketNet is not a WebSocket implementation. Although Socket.IO indeed uses WebSocket as a transport when possible, it adds some metadata to each packet: the packet type, the namespace and the ack id when a message acknowledgement is needed. That is why a WebSocket client will not be able to successfully connect to a Socket.IO server, and a Socket.IO client will not be able to connect to a WebSocket server (like `ws://echo.websocket.org`) either. Please see the protocol specification [here](https://github.com/socketio/socket.io-protocol).

## Contributors

Become an official contributor and get your photo on our README with a link to your site. [[Become a contributor](https://opencollective.com/bytes-crafter)]

<a href="https://www.linkedin.com/in/caezar-ii-de-castro-302945140/" target="_blank"><img src="https://media.licdn.com/dms/image/C5603AQFK6jxIOWfiBA/profile-displayphoto-shrink_200_200/0?e=1533772800&v=beta&t=UNo9owDHWsDp47Ka4SgM_LGE42_Lw4W3gDkmNyPdo-o"></a>

## License

[MIT](LICENSE)