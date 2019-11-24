
var request = require('request');

function post(cred, core, cback)
{
    request.post(
        'http://' + core.config.admin.wpress.host + '/wp-json/usocketnet/v1/auth/token',
        { form: { wpid: cred.wpid, snid: cred.snid } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                cback( { status: 'success', data: body } );
            } else {
                cback( { status: 'error'} );
            }
        }
    );
} module.exports.post = post;