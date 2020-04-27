
//Reference for config.
const config = require('usn-utils').config;

//Prepare restapi core.
const request = require('./restapi');

//prepare redis.
const redis = require('./redis');
const redisConf = {
    host: config.safe('redis.host', '127.0.0.1'),
    post: config.safe('redis.post', '6379'),
    password: config.safe('redis.pword', '')
};

//prepare express.
const express = require('./express');

module.exports = {
    request: request.init( config.safe('restapi.url', 'http://localhost') ),
    redis: redis.init( redisConf ),
    express: express,
};
