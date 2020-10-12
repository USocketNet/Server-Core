
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

//Require our custom Express.
const express = require('usn-libs').express;
const usn_express = express.init();
const config = require('usn-utils').config;

//Set and serve static files.
usn_express.set_static('/', 'public/static')

usn_express.instance.get('/', function (req, res, next) {
    res.sendFile('./public/view/index.html', { root: __dirname })
})

usn_express.instance.get('/dashboard', function (req, res, next) {
    res.sendFile('./public/view/dashboard.html', { root: __dirname })
})

usn_express.instance.get('/matching', function (req, res, next) {
    res.sendFile('./public/view/matching.html', { root: __dirname })
})

usn_express.instance.get('/message', function (req, res, next) {
    res.sendFile('./public/view/message.html', { root: __dirname })
})

usn_express.instance.get('/settings', function (req, res, next) {
    res.sendFile('./public/view/settings.html', { root: __dirname })
})

usn_express.instance.get('/locator', function (req, res, next) {
    res.sendFile('./public/view/locator.html', { root: __dirname })
})

usn_express.instance.use(function (req, res, next) {
    res.status(200).sendFile('./public/view/error.html', { root: __dirname })
})

usn_express.serve( config.safe('demoguy.port', '3000') );