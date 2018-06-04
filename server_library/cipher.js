//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytes-crafter.com"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2018.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//																																//
// 		                 		Property of Bytes Crafter : Website - "www.bytes-crafter.com"    								//
// 		                 		This script is subjected to Copyrights Law. All rights Reserved. 								//
// 		                   		Project Involved: USocketNet v1.0.0 Server  for Unity of 2018.  								//
//																																//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////