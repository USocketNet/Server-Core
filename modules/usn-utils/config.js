
const pckgConf = require('../../package.json');
const constConf = require('../../config/constant.json');
const defltConf = require('../../config/default.json');

class usn_config {

    constructor ( json ) {
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

        let port = process.env.PORT || 3000;
        switch ( type ) {
            case 'master':
                port = argv.master;
                break;
            case 'message':
                port = argv.message;
                break;
            case 'match':
                port = argv.match;
                break;
            default:
        }
        return { name: argv.name, port: port };
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

module.exports.init = (json) => {
	return new usn_config(json);
}