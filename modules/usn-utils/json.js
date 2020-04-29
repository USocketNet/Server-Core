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

class usn_json {

    /**
     * During instantiation of usn_json class, a constructor is 
     * invoked which needs 0 parameter.
     */
    constructor () {
        //For future initialization params.
    }

    /**
     * Combine multiple JSON object in an array of arguments and 
     * return that as one JSON object. Take note that first argument 
     * will be overwritten by the next arguments. 
     */
    extend () {
        let newJson = {};
        let sources = [].slice.call(arguments, 0);

        sources.forEach( (source) => {
            for (let prop in source) {
                newJson[prop] = source[prop];
            }
        });

        return newJson;
    }

    /**
     * Check if a JSON objecct is empty which return true and if not 
     * obviously! this will return false instead.
     * @param  {} obj
     */
    isObjectEmpty(obj) {
        return !Object.keys(obj).length;
    }

    /**
     * Because assigning JSON object to another JSON object will only 
     * do referencing, use this to have independent copy of that object.
     * @param  {} json
     */
    cloneJson( json ) {
        var string = JSON.stringify(json);
        return JSON.parse(string);
    }
}

/**
 * Initialized USN json processor class.
 * @param  {} =>{ return new usn_json() }
 */
module.exports.init = () => {
	return new usn_json();
}