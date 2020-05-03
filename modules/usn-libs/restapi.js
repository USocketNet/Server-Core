
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

class usn_restapi {
    
    /**
     * During instantiation of usn_restapi class, a constructor is 
     * invoked which needs 1 parameter and that is destination url,
     * it must be provided which will used to each and every post request.
     * @param  {} url
     */
    constructor ( url ) {
        //Declare the one and only restapi.
        this.wpress_url = url;

        //Include server config class.
        this.config = require('usn-utils').config;

        //Include the npm request module.
        this.request = require('request');
    }

    /**
     * RestApi post request functiion that expecting for option in this format: 
     * { uri, json: true, form: { query1, query2 }} to return json object.
     * @param  {} options
     * @param  {} cback
     */
    post ( options, cback ) {
        //Make a post request to the initialized reatapi url.
        this.request.post(options, (err, res, data) => {
                //Check if the restapi normally response.
                if (!err && res.statusCode == 200) {
                    //RestAPI response follow our format. so return data!
                    if(typeof data.status != 'undefined') {
                        if(data.status == 'success') {
                            return cback({ 
                                status: 'success', 
                                data: data
                            });
                        } else {
                            return cback({ 
                                status: 'failed', 
                                message: 'RestApi request failed response: ' + data.message,
                            });
                        }
                    } else {
                        //else! then notify requester that data is not valid.
                        return cback({ 
                            status: 'unknown', 
                            message: 'RestApi response does not conform with the standards.' 
                        });
                    }
                }
                
                //If there was an error but response is undefined therefore, restapi is unreachable.
                if( typeof res === 'undefined' ) {
                    cback({ 
                        status: 'notfound', 
                        message: 'RestApi that you provide is unreachable or cant accept connection.' 
                    });
                } else {
                    //else RestApi is reachable but for some reason, internal server error was thrown.
                    cback({ 
                        status: 'error',
                        message: 'RestApi response a status of ' + res.statusCode + ' from hostname ' + res.request.uri.hostname + ':' + res.request.port + '.' 
                    });
                }
            }
        );
    }

    /**
     * Verify cred { wpid, snid } to the initialized restapi url provided.
     * Then callback an object response, { status: 'success', data: object }.
     * @param  {} cred
     * @param  {} cback
     */
    user_verify ( cred, cback ) {

        //Prepare credential data to used during restapi verification.
        let options = {
            uri: this.wpress_url + '/wp-json/usocketnet/v1/user/verify',
            json: true,
            form: { 
                wpid: cred.wpid, 
                snid: cred.snid,
            }
        };
        this.post(options, cback);
    }

    /**
     * Initially check restapi provided and run cluster server and will return 
     * a console and file log whether the restapi is reachable or not.
     */
    cluster_verify( cback ) {
        //Prepare credential data to used during restapi checking.
        let options = {
            uri: this.wpress_url + '/wp-json/usocketnet/v1/cluster/verify',
            json: true,
            form: { 
                securekey: this.config.safe('restapi.key', ''), 
            }
        };
        this.post(options, cback);
    }
}

/**
 * Initialized USN usn_restapi class.
 * @param  {} =>{ return new usn_restapi() }
 */
module.exports.init = ( url ) => {
    return new usn_restapi( url );
};