
# USocketNet - Server

The USocketNet is currently designed and developed for Unity Engine. It is a multi-platform that can be used through mobile or standalone computers. The developers advised the users to report any issues or bugs immediately to further improve our services. We are driven to develop more and add new powerful features. We are positively driven to improve more and add new powerful features.

### Its main features are:

* USocketNet enables real-time bidirectional event-based communication. It consists in:

- Realtime WebSocket Connection.
- Host your own server.
- Cross-Platform with Unity.
- Reconnect Client Event.
- Realtime Admin Page.
- Server Health Monitoring.
- Flexible and Scalable.
- Matchmaking Mechanism.
- Any Gameplay Compatible.

* Connections are established even in the presence of:
  - proxies and load balancers with Nginx Server.
  - personal firewall and antivirus software by Socket.IO.
  - in memory json data cache with Redis Server.
  - multi instancing and keymetrics by npm PM2.
  - easy npm devDependencies updates NPM npm-gui.

#### Reliability

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

## Getting Started

### Prerequisites

* NodeJS
Node.js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a browser.

* Nginx
Nginx is a web server which can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache. The software was created by Igor Sysoev and first publicly released in 2004. A company of the same name was founded in 2011 to provide support and Nginx plus paid software.

* MySQL
MySQL is an open-source relational database management system. Its name is a combination of "My", the name of co-founder Michael Widenius's daughter, and "SQL", the abbreviation for Structured Query Language.

* Redis
Redis is an in-memory data structure project implementing a distributed, in-memory key-value database with optional durability. Redis supports different kinds of abstract data structures, such as strings, lists, maps, sets, sorted sets, HyperLogLogs, bitmaps, streams, and spatial indexes.

* PM2
PM2 is a production process manager for Node.js applications with a built-in load balancer. It allows you to keep applications alive forever, to reload them without downtime and to facilitate common system admin tasks.

### Installing

STEP 1 - SETUP NGINX LOAD BALANCER.

- MASTER INTANCE - PORT 19090 (19091-19099)
- CHAT INTANCE - PORT 6060 (6061-6069)
- GAME INTANCE - PORT 9090 (9091-9099)

STEP 2 - SETUP BACKEND AND FRONTEND WORDPRESS.

* Prepare your LAMP stack for your wordpress environment.
* Setup wordpress as your root public html.
* Add USocketNet theme as frontend to all users.
* Add USocketNet plugin for backend management.

STEP 3 - LAUNCH THE INSTANCES.

* PORT SERVER SEGRATION TO APP INTANCES.
- MASTER INTANCE - (19091-19099)
- CHAT INTANCE - (6061-6069)
- GAME INTANCE - (9091-9099)

* ADDING NEW INSTANCE OF THE SERVER.
  ```
    $ CODE: PORT=3001 pm2 start --name master server.js -- --query values
    // PORT : Port value should not be used. Use Task Manager -> Network and find the corresponding PID.
    // pm2 : Call or use the global dependency of pm2 npm package.
    // start : Start instance of the following server.js reference.
    // --name IDENTITY : Tag and value of the process name or identity of the instance.
    // server.js : Sample target node js application or server to initiate.
    // -- : Separate pm2 arguments to node js arguments.
    // --name : Name of the Node Js application or Server. 
  ```

* OTHER BASIC PM2 COMMANDS THAT COULD BE USEFULL.
  ```
    $ pm2 startup //Enable startup of all saved intance of apps. [Windows](https://www.npmjs.com/package/pm2-windows-startup)
    $ pm2 start id/index //Start the current instance of the Node JS app.
    $ pm2 stop id/index //Stop the current instance of the Node JS app.
    $ pm2 restart id/index //Restart the current instance of the Node JS app.
    $ pm2 monit //Show grid view of all apps running and more details like global logs.
    $ pm2 log id/index //Show the console logging of the target instance.
    $ pm2 show id/index //Show information of the curren instance except port.
    $ pm2 ls //Show all instance of the current machine in tabulated format.
    $ pm2 save //Save the current process list as dump to be able to restore on computer restart.
    $ pm2 resurrect //Restart all process list before computer shutdown which has been saved. 
    $ pm2 delete id/index //Delete abrupty the current instance of the Node JS app.
    $ pm2 delete all //Delete all instance of process in the current machine.
  ```



## Deployment

Google Cloud, Amazon AWS, etc. Operating system is preferably in linux environment, either debian or centos as production server. We will provide thourough documentation about the deployment of USocketNet in any possible way.

## Built With

### NPM packages on FINAL:

* [express](https://www.npmjs.com/package/express) - 
* [mysql](https://www.npmjs.com/package/mysql) - 
* [socket.io](https://www.npmjs.com/package/socket.io) - 
* [socket.io-redis](https://www.npmjs.com/package/socket.io-redis) - 

### NPM packages on RESERVED:

* [body-parser](https://www.npmjs.com/package/body-parser) - 
* [cors](https://www.npmjs.com/package/cors) - 
* [crc](https://www.npmjs.com/package/crc) - 
* [crypto-js](https://www.npmjs.com/package/crypto-js) - 
* [ejs](https://www.npmjs.com/package/ejs) - 
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