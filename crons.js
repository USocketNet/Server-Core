
/*
    * Package: USocketNet
    * Description: Multipurpose Realtime Server for your 
    *   Multiplayer Game, Chat App, or Delivery App.
    * Package-Website: https://usocketnet.bytescrafter.net
    * 
    * Author: Bytes Crafter
    * Author-Website:: https://www.bytescrafter.net/about-us
    * License: Copyright (C) Bytes Crafter - All rights Reserved. 
*/

//Get config instance.
const config = require('usn-utils').config;

//RestAPI instance.
const restapi = require('usn-libs').restapi.init( config.safe('restapi.url', 'http://localhost') );

// Crons
setInterval( function(){ 
    restapi.wp_crons( '/wp-json/hatidpress/v2/deliveries/queuing/process', (response) => {
        var currentdate = new Date(); 
        var datetime = "Last Sync: "
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        console.log( 'Queuing Order @ ' + datetime + ' - ' + JSON.stringify(response) ); 
    });
    restapi.wp_crons( '/wp-json/hatidpress/v2/navigation/nearest/rider', (response) => {
        var currentdate = new Date(); 
        var datetime = "Last Sync: "
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
        console.log( 'Finding Rider @ ' + datetime + ' - ' + JSON.stringify(response) ); 
    });
}, 1000)

