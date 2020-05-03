
/*
    * Package: USocketNet
    * Description: Self-Host Realtime Multiplayer Server 
    *       for your Game or Chat Application.
    * Package-Website: https://usocketnet.bytescrafter.net
    * 
    * Author: Bytes Crafter
    * Author-Website:: https://www.bytescrafter.net/about-us
    * License: Copyright (C) Bytes Crafter - All rights Reserved. 
*/

const server_type = 'cluster';
const core = require('usn-core');
const instance = core.socketio.init();

const debug = require('usn-utils').debug;
const config = require('usn-utils').config;

const restapi = require('usn-libs').restapi.init( config.safe('restapi.url', 'http://localhost') );

    //Check and verify restapi secret key.
    restapi.cluster_verify( (res) => {
        if(res.status == 'success') {
            debug.log('USocketNet-Cluster-Verify', 'RestAPI and Realt-time server are now Ready.', 'green', 'cluster');
        } else {
            debug.log('USocketNet-Cluster-Verify', res.message, 'red', 'cluster');
        }
    });

//Include USocketNet redis & Select databsae for this server.
const redis = require('usn-libs').redis.init( config.redis() );
    redis.select(0);

    core.cluster.hostinfo( (data) => {
        redis.pushHostinfo(data, (res) => {
            let donePush = true;
            setInterval(() => {
                //Submit data to redis every second.
                if(donePush) {
                    donePush = false;
                    core.cluster.summary( (data) => {
                        redis.pushSummary(data, (res) => {
                            donePush = true;
                        });
                    });
                }
            }, 1000);   
        });
    });

    //Prevent client socket connection if condition is not met.
    instance.sio.use( core.syntry.verification );

    //Host a server with the instance of express.
const conn = instance.connect( server_type );

//Actual SocketIO instance.
instance.sio.on('connection', (socket) => {

    //Called by client that its connected.
    socket.on('connects', (data, cback) => {
        if(typeof cback === 'function') {
            //Retrieve machine info frrom pm2.
            redis.getHostStats( (reply) => {
                cback(reply);
            });
        }
    });

    //Received from client and reply a data.
    socket.on('status_summary', (cback) => {
        redis.getSummaryStats( (reply) => {
            cback(reply);
        });
    });

    //Restart process by id or name.
    socket.on('process_restart', (pid, cback) => {
        //Problem on same call with redis summary query.
        //core.cluster.restart(pid, cback);
    });

});
