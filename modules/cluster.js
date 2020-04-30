
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

    //Check and verify restapi secret key.
    const restapi = require('usn-libs').restapi;
        restapi.check( (res) => {
            if(res.status == 'success') {
                debug.log('USocketNet-Cluster-RestApi', 'The RestApi respond successfully and able to respond to our request.', 'green', 'cluster');
            } else {
                debug.log('USocketNet-Cluster-RestApi', 'The RestApi was not able to respond properly or completely unreachable.', 'red', 'cluster');
            }
        });    


    //Host a server with the instance of express.
    const conn = instance.connect( server_type );

    //Prevent client socket connection if condition is not met.
    instance.sio.use( core.syntry.verification );

    //Actual SocketIO instance.
    instance.sio.on('connection', (socket) => {

        //Called by client that its connected.
        socket.on('connects', (data, cback) => {
        if(typeof cback === 'function') {
            cback( conn.address().port );
        }
        });

    });
