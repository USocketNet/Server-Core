
# USocketNet

#### Short Description: Self-Host Realtime Bidirectional Event-Based Communication for your Game or Chat Application. 

The USocketNet is currently designed and developed for Unity Engine. It is a multi-platform by design that can be used through mobile, computers, or even web. We advised the developers to report any issues or bugs immediately to further fix and improve our code. We are driven to add new features that will make this project awesome for everyone.

### Its main features are:

- Realtime WebSocket connection using the stable and reliable socket.io-engine.
- Host your own server anywhere, it can be any VPS, CLOUD, or NodeJS hosting.
- Cross-Platform with Unity, if unity supports it, we will also support it.
- Yes! We support WebGL build even if threading is not allowed on the browser.
- Reconnect event handling which automatically resyncs client to the server.
- Dedicated Realtime GUI backend page for all server instance.
- Stability (socket.io), Security (NodeJS) and Scalability (NGINX).
- Matchmaking mechanism for auto, create, join and lots of options.
- Dedicate and easy to use, we have messaging service for private and public.
- Lots of features to be announce! Stay tuned for more updates.

* Connections are established even in the presence of:
  - proxies and load balancers with Nginx Server.
  - personal firewall and antivirus software by Socket.IO.
  - in memory json data cache with Redis Server.
  - multi instancing and keymetrics by npm PM2.
  - easy npm devDependencies updates NPM npm-gui.

Within each `Server`, you can define arbitrary channels, called `Channel`, that sockets can join and leave. You can then broadcast to any given channel, reaching every socket that has joined it. This is a useful feature to send notifications to a group of users, or to a given user connected on several devices for example.

**Note:** USocketNet is not a WebSocket implementation. Although USocketNet indeed uses WebSocket as a transport when possible, it adds some metadata to each packet: the packet type, the namespace and the ack id when a message acknowledgement is needed. That is why a WebSocket client will not be able to successfully connect to a USocketNet server, and a USocketNet client will not be able to connect to a WebSocket server (like `ws://echo.websocket.org`) either.

## Getting Started

### Prerequisites

* NodeJS
  - Node.js is an open-source, cross-platform, JavaScript runtime environment that executes JavaScript code outside of a browser.

* Nginx
  - Nginx is a web server which can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache. The software was created by Igor Sysoev and first publicly released in 2004. A company of the same name was founded in 2011 to provide support and Nginx plus paid software.

* MySQL
  - MySQL is an open-source relational database management system. Its name is a combination of "My", the name of co-founder Michael Widenius's daughter, and "SQL", the abbreviation for Structured Query Language.

* Redis
  - Redis is an in-memory data structure project implementing a distributed, in-memory key-value database with optional durability. Redis supports different kinds of abstract data structures, such as strings, lists, maps, sets, sorted sets, HyperLogLogs, bitmaps, streams, and spatial indexes.

* NPM
  - NPM is a package manager for the JavaScript programming language. It is the default package manager for the JavaScript runtime environment Node.js. The following are the required NPM package that must be install globally.
    - PM2 - is a production process manager for Node.js applications with a built-in load balancer. It allows you to keep applications alive forever, to reload them without downtime and to facilitate common system admin tasks. Run: ``` npm install pm2 -g ```
    - Artillery - is a modern, powerful & easy-to-use load testing and functional testing toolkit. Use it to ship scalable applications that stay performant & resilient under high load. Run: ``` npm install artillery -g ```

### Testing Environment

This project includes built-in http server for WordPress which is nginx, SQL database using MySql, PHP version 7 as cgi engine. On windows, you can easily start or stop this said server on /test. To run Nginx, PHP, and MySQL server: Use our built-in .bat executable on windows. Click on start, stop, or even check to check if all server is currently running. Download this Github [Release](https://github.com/BytesCrafter/LEMP-Stack-on-Windows/releases/tag/working) for LEMP stacks,, dont forget leave your stars on that git repo. Thanks!

- Copy the public/demoguy folder to the html forlder of that nginx so that we can test USocketNet sample chat application.
- Install a WordPress on nginx just by downloading WordPress into html path of nginx. First, create MySQL database using phpMyAdmin.
- Copy or install usocketnet-backend from public/wordpress/wp-content/plugins to your new wordpress and activate it on WP Admin.

#### Credentials

This are the default credentials that we use during development. This credential should be replace with much stronger phrase on production.

* MySQL root users
  - UN: root  PW: root
  - UN: admin PW: admin

* WordPress users
  - UN: admin PW: admin TP: admin
  - UN: demo  PW: demo  TP: subscribers
  - UN: test  PW: test  TP: subscribers

### Testing

LOAD BENCHMARKING

- Run this to automatically load test your app. But before you do, 
please ensure to run ``` npm install artillery -g ``` to install 
the package that will execute server benchmarking. Then run this to 
benchmark: ``` artillery run tests/artillery.yaml ```

SAFE MODE TESTING

- We made some built-in testing to test if the required server such as 
redis, mysql, and path writability have no issues. We made this just to make 
sure that you NEED to FIRST RUN this: ``` npm test ``` so that the app will 
have no critical issue.

### Installing

#### STEP 1 - SETUP NGINX LOAD BALANCER.

This are the required config for NGIX server for load balance. By default

- MASTER INTANCE - PORT 19090 (19091-19099)
- CHAT INTANCE - PORT 6060 (6061-6069)
- GAME INTANCE - PORT 9090 (9091-9099)

#### STEP 2 - SETUP BACKEND AND FRONTEND WORDPRESS.

* Prepare your LAMP stack for your wordpress environment.
* Setup wordpress as your root public html.
* Add USocketNet theme as frontend to all users.
* Add USocketNet plugin for backend management.

#### STEP 3 - LAUNCH THE INSTANCES.

* PORT SERVER SEGRATION TO APP INTANCES.
- MASTER INTANCE - (19091-19099)
- CHAT INTANCE - (6061-6069)
- GAME INTANCE - (9091-9099)

##### ADDING NEW INSTANCE OF THE SERVER.
  ```
    $ CODE: pm2 start usocketnet.js --name svr-1 -- --name svr1 --master 19091 --chat 6061 --game 9091
    // pm2 : Call or use the global dependency of pm2 npm package.
    // start : Start instance of the following server.js reference.
    // server.js : USocketNet target node js application or server to initiate.
    // --name svr-# : Name of the instance when you run > pm2 list.
    // -- : Separate pm2 arguments to node js arguments.
    // --name : This will be the name of the instance that will be using to log on the server.
    // --master : 19091-19099 - available port for master that is must be declare on nginx.conf
    // --chat : 6061-6069 - available port for chat that is must be declare on nginx.conf
    // --game : 9091-9099 - available port for game that is must be declare on nginx.conf
  ```

##### OTHER BASIC PM2 COMMANDS THAT COULD BE USEFULL.
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

### NPM packages:

* [socket.io](https://www.npmjs.com/package/socket.io) - https://www.npmjs.com/package/socket.io
* [socket.io-redis](https://www.npmjs.com/package/socket.io-redis) - https://www.npmjs.com/package/socket.io-redis
* [express](https://www.npmjs.com/package/express) - https://www.npmjs.com/package/express
* [ioredis](https://www.npmjs.com/package/ioredis) - https://www.npmjs.com/package/ioredis
* [mysql](https://www.npmjs.com/package/mysql) - https://www.npmjs.com/package/mysql
* [redis](https://www.npmjs.com/package/redis) - https://www.npmjs.com/package/redis
* [request](https://www.npmjs.com/package/request) - https://www.npmjs.com/package/request
* [body-parser](https://www.npmjs.com/package/body-parser) - https://www.npmjs.com/package/body-parser
* [cors](https://www.npmjs.com/package/cors) - https://www.npmjs.com/package/cors
* [minimist](https://www.npmjs.com/package/minimist) - https://www.npmjs.com/package/minimist

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/BytesCrafter). 

## Authors

* **Caezar V. De Castro II** - *Initial work* - [Github](https://github.com/BytesCrafter/USocketNet-on-NodeJS)

See also the list of [contributors](https://github.com/BytesCrafter) who participated in this project.

## License

This project is licensed under the GNU GPL License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* Bytes Crafter
* Copyright 2020
