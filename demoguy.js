
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

//Require our custom Express.
const express = require('usn-libs').express;
const usn_express = express.init();

//Set and serve static files.
usn_express.set_static('/', 'public/static')

//Serve the actual html file.
usn_express.instance.get('/', function (req, res, next) {
    res.sendFile('./public/view/index.html', { root: __dirname })
})

usn_express.instance.get('/dashboard', function (req, res, next) {
    res.sendFile('./public/view/dashboard.html', { root: __dirname })
})

usn_express.instance.get('/message', function (req, res, next) {
    res.sendFile('./public/view/message.html', { root: __dirname })
})

usn_express.instance.get('/settings', function (req, res, next) {
    res.sendFile('./public/view/settings.html', { root: __dirname })
})

//Serve the Demoguy site.
usn_express.serve(80);