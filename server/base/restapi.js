
const request = require('request');

module.exports = ( url ) => {
    return new usn_restapi( url );
};

class usn_restapi {
    constructor ( url ) {
        this.wpress_url = url;
    }

    verify ( cred, cback ) {
        request.post(
            'http://' + this.wpress_url + '/wp-json/usocketnet/v1/token',
            { form: { wpid: cred.wpid, snid: cred.snid, apid: cred.apid } },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    cback( { status: 'success', data: body } );
                } else {
                    if( typeof response === 'undefined' ) {
                        cback( { status: 'error', message: 'USocketNet reach the hostname that you provide for wpress.' } );
                    } else {
                        cback( { status: 'error', message: 'RestApi response a status of ' + response.statusCode + ' from hostname ' 
                            + response.request.uri.hostname + ':' + response.request.uri.protocol + '.' } );
                    }
                }
            }
        );
    }
}