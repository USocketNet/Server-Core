
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

class usn_config {

    /**
     * During instantiation of usn_config class, a constructor is 
     * invoked which needs 0 parameter.
     */
    constructor () {
        //Load required config file including package.json
        const constConf = require('../../config/constant.json');
        const defltConf = require('../../config/default.json');
        const pckgConf = require('../../package.json');

        //Include JSON processor class.
        const json = require('./json').init();

        //Combine constant.json and default.json object.
        let appPkg = json.extend(constConf, defltConf)

        //Get the package.json item that we need.
        let mainPkg = {
           name: pckgConf.name, 
           description: pckgConf.description, 
           author: pckgConf.author,
           version: pckgConf.version
        };

        //Provide class complete config items.
        this.config = json.extend(appPkg, mainPkg)
    }
    /**
     * Check if the config {key} does exist on global configuration.
     * @param  {} key
     */
    has( key ) {
        return this.config.hasOwnProperty(key) ? true : false;
    }

    /**
     * Get the config {key} values but return undefined if not existing.
     * @param  {} key
     */
    get( key ) {
        return this.has(key) ? this.config[key] : 'undefined';
    }
    /**
     * Get the value of config {key} but can pass default value if key does not exist.
     * @param  {} key
     */
    safe( key, def ) {
        return this.has(key) ? this.config[key] : def;
    }

    /**
     * Return port from minimist->argv provided but return 3000 if server type is not found.
     * @param  {} type
     * @param  {} argv
     */
    server( type, argv ) {
        switch ( type ) {
            case 'cluster':
                return { port: argv.cluster };
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
    /**
     * Return official redis JSON config format. If password is string.empty on config,
     * password item in the return redis config object is included.
     */
    redis () {
        let redisConfig = {};

        if(this.config.hasOwnProperty('redis.host') && this.config.hasOwnProperty('redis.port') 
            && this.config.hasOwnProperty('redis.pword') && this.config.hasOwnProperty('redis.auth')) {
            
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

/**
 * Initialized USN usn_config class.
 * @param  {} =>{ return new usn_config() }
 */
module.exports.init = () => {
	return new usn_config();
}