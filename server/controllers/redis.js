
module.exports = function(core, dbi) {

    var Redis = require("ioredis");
    var redis = new Redis({db: dbi});

    return redis;
};
