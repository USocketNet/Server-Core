
const utils = require('usn-utils');
module.exports.utils = utils;

//Prepare restapi core.
const request = require('./restapi');
module.exports.request = request.init( utils.config.safe('restapi.url', 'http://localhost') );

//prepare redis.
const redis = require('./redis');
const redisConf = {
    host: utils.config.safe('redis.host', '127.0.0.1'),
    post: utils.config.safe('redis.post', '6379'),
    password: utils.config.safe('redis.pword', '')
};
module.exports.redis = redis.init( redisConf );

//prepare express.
const express = require('./express');
module.exports.express = express;
