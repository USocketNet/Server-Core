
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

const restapi = require('usn-libs').restapi;
const debug = require('usn-utils').debug;

    //Check and verify restapi secret key.
    restapi.check( (res) => {
        if(res.status == 'success') {
            debug.log('USocketNet-Cluster-RestApi', 'The RestApi respond successfully and able to respond to our request.', 'green', 'cluster');
        } else {
            debug.log('USocketNet-Cluster-RestApi', 'The RestApi was not able to respond properly or completely unreachable.', 'red', 'cluster');
        }
    });

const redis = require('usn-libs').redis;

    let donePush = true;
    setInterval(() => {
        //Submit data to redis every second.
        if(donePush) {
            donePush = false;
            core.cluster.summary( (data) => {
                const start = new Date();
                redis.pushSummaryStats(data, (res) => {
                    //console.log("Execution Time: " + (new Date() - start) + " ms");
                    donePush = true;
                });
            });
        }
    }, 1000);
    

//Host a server with the instance of express.
const conn = instance.connect( server_type );

//Prevent client socket connection if condition is not met.
instance.sio.use( core.syntry.verification );

//Actual SocketIO instance.
instance.sio.on('connection', (socket) => {

    //Received from client and reply a data.
    socket.on('status_summary', (cback) => {
        redis.getSummaryStats( (reply) => {
            cback(reply);
        });
    });

    //Called by client that its connected.
    socket.on('connects', (data, cback) => {
        if(typeof cback === 'function') {
            cback( conn.address().port );
        }
    });

});
