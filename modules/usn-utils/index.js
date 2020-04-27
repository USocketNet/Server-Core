
//JSon related function.
const refjson = require('./json');

//Debugging utility.
const refdebug = require('./debug');

//Global configurations.
const refconfig = require('./config');

//Include process for some reason.
const procs = require('./process');

module.exports = {
    json: refjson.init(),
    debug: refdebug.init(),
    config: refconfig.init(),
    procs: procs.init(),
};

