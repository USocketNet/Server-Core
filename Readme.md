
# USocketNet - Server

The USocketNet is currently designed and developed for Unity Engine. It is a multi-platform that can be used through mobile or standalone computers. The developers advised the users to report any issues or bugs immediately to further improve our services. We are driven to develop more and add new powerful features. We are positively driven to improve more and add new powerful features.

## Getting Started

//INSERTING NEW INSTANCE OF THE SERVER.
//
//CODE: PORT=4100 pm2 start --name v0.9.0-A server.js -- --name v090A
//
//> PORT : Port value should not be used. Use Task Manager -> Network and find the corresponding PID.
//> pm2 : Call or use the global dependency of pm2 npm package.
//> start : Start instance of the following server.js reference.
//> --name IDENTITY : Tag and value of the process name or identity of the instance.
//> server.js : Sample target node js application or server to initiate.
//> -- : Separate pm2 arguments to node js arguments.
//> --name : Name of the Node Js application or Server. 
//

### Prerequisites

#### NodeJS
#### Nginx
#### MySQL
#### Redis
#### PM2

- Link Here: http://pm2.keymetrics.io

//OTHER PM2 BASIC COMMAND TO USE.
//
//pm2 save : Save the current process list as dump to be able to restore on computer restart.
//pm2 resurrect : Restart all process list before computer shutdown which has been saved.
//pm2 delete all : Delete all instance of process in the current machine.
//pm2 delete id/index : Delete abrupty the current instance of the Node JS app.
//pm2 stop id/index : Stop the current instance of the Node JS app.
//pm2 start id/index : Start the current instance of the Node JS app.
//pm2 restart id/index : Restart the current instance of the Node JS app.
//pm2 ls : Show all instance of the current machine in tabulated format.
//pm2 show id/index : Show information of the curren instance except port.
//pm2 logs id/index : Show the console logging of the target instance.
//
//FOR MORE INFORMATION OF COMMAND: http://pm2.keymetrics.io/docs/usage/quick-start/
//

### Installing

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
## Deployment

EXAMPLE START
Add additional notes about how to deploy this on a live system
EXAMPLE END

## Built With

NPM packages on FINAL:

* [socket](https://www.npmjs.com/package/) - 


* [socket.io](https://www.npmjs.com/package/socket.io) - 
* [socket.io-redis](https://www.npmjs.com/package/socket.io-redis) - 

NPM packages on RESERVED:


* [redis](https://www.npmjs.com/package/redis) - 
* [swagger-stats](https://www.npmjs.com/package/swagger-stats) - 



## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/BytesCrafter). 

## Authors

* **Caezar V. De Castro II** - *Initial work* - [GitLab](https://gitlab.com/BytesCrafter)

See also the list of [contributors](https://github.com/BytesCrafter) who participated in this project.

## License

This project is licensed under the GNU GPL License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* Bytes Crafter
* Copyright 2019