
const request = require('request');

module.exports = ( url ) => {
    return new usn_restapi( url );
};

class usn_restapi {
    constructor ( url ) {
        this.wpress_url = url;
    }

    verify ( cred, cback ) {

        let options = {
            uri: this.wpress_url + '/wp-json/usocketnet/v1/token',
            json: true,
            form: { 
                wpid: cred.wpid, 
                snid: cred.snid, 
                apid: cred.apid 
            }
        };

        request.post(options, (err, res, body) => {
                if (!err && res.statusCode == 200) {
                    cback( body );
                } else {
                    if( typeof res === 'undefined' ) {
                        cback({ 
                            status: 'notfound', 
                            message: 'RestApi that you provide refused to to accept the connection.' 
                        });
                    } else {
                        cback({ 
                            status: 'error',
                            message: 'RestApi response a status of ' + res.statusCode + ' from hostname ' + res.request.uri.hostname + ':' + res.request.port + '.' 
                        });
                    }
                }
            }
        );
    }
}