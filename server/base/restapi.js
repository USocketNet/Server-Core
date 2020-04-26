
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
            this.wpress_url + '/wp-json/usocketnet/v1/token',
            { form: { wpid: cred.wpid, snid: cred.snid, apid: cred.apid } },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    cback( { status: 'success', data: body } );
                } else {
                    if( typeof response === 'undefined' ) {
                        cback( { status: 'error', message: 'RestApi that you provide for return with no response.' } );
                    } else {
                        cback( { status: 'error', message: 'RestApi response a status of ' + response.statusCode + ' from hostname ' 
                            + response.request.uri.hostname + ':' + response.request.port + '.' } );
                    }
                }
            }
        );
    }
}