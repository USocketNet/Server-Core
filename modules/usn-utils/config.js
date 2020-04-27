
const pckgConf = require('../../package.json');
const constConf = require('../../config/constant.json');
const defltConf = require('../../config/default.json');
const json = require('./json').init();

class usn_config {

    constructor () {
        let appPkg = json.extend({}, constConf, defltConf)
        let mainPkg = {
           name: pckgConf.name, 
           description: pckgConf.description, 
           author: pckgConf.author,
           version: pckgConf.version
        };
        this.config = json.extend({}, appPkg, mainPkg)
        return this;
    }

    has( key ) {
        return this.config[key] !== 'undefined' ? true : false;
    }

    get( key ) {
        return this.config[key];
    }

    safe( key, def ) {
        if(this.config.hasOwnProperty(key)) {
            return this.config[key];
        } else {
            return def;
        }
    }

    server( type, argv ) {
        switch ( type ) {
            case 'master':
                return { port: argv.master };
            case 'message':
                return { port: argv.message };
            case 'match':
                return { port: argv.match };
            case 'game':
                return { port: argv.game };
            default:
                return '3000';
        }
    }

    redis () {
        let redisConfig = {};
        if(this.config.hasOwnProperty('redis.host') && this.config.hasOwnProperty('redis.port') && this.config.hasOwnProperty('redis.pword') && this.config.hasOwnProperty('redis.auth')) {
            redisConfig.host = this.config['redis.host'];
            redisConfig.port = this.config['redis.port'];
            if(this.config['redis.auth'] === true) {
                redisConfig.password = this.config['redis.pword'];
            }
            
        } else {
            redisConfig.host = 'localhost';
            redisConfig.port = '6379';
            if(this.config['redis.auth'] === true) {
                redisConfig.password = this.config['redis.pword'];
            }
        }

        return redisConfig;
    }
}

module.exports.init = () => {
	return new usn_config();
}