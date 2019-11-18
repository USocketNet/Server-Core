
const crc = require('crc'); //short hash encryption.
var crypto = require('crypto-js');

module.exports = 
{
    hash: function(stringy)
    {
        return crc.crc32(stringy).toString(16);
    },
    
    encrypt: function(stringy) 
    {
        return crypto.AES.encrypt(stringy, sv.authKey);
    },

    decrypt: function(stringy) 
    {
        return crypto.AES.decrypt(ciphertext.toString(), sv.authKey).toString(crypto.enc.Utf8);
    }
};
