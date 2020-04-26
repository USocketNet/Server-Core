
//JSon related function.
const json = require('./json');
module.exports.json = json.init();

//Debugging utility.
const debug = require('./debug');
module.exports.debug = debug.init();

const procs = require('./process');
module.exports.procs = procs.init(this.debug);

//Global configurations.
const config = require('./config');
module.exports.config = config.init(this.json);

