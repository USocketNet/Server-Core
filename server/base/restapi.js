
const request = require('request');

module.exports = ( url ) => {
    return new usn_restapi( url );
};

class usn_restapi {
    wpress_url = 'undefined';
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
                    cback( { status: 'error'} );
                }
            }
        );
    }
}