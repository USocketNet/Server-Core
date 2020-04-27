
class usn_json {

    constructor () {
        
    }

    // Combine two jsons.
    extend (target) {
        let sources = [].slice.call(arguments, 1);
        sources.forEach( (source) => {
            for (let prop in source) {
                target[prop] = source[prop];
            }
        });
        return target;
    }

    //Check if js obj is empty or not.
    isObjectEmpty(obj) {
        return !Object.keys(obj).length;
    }

    //Make sure that json var is not reference.
    cloneJson( json ) {
        var string = JSON.stringify(json);
        return JSON.parse(string);
    }

}

module.exports.init = () => {
	return new usn_json();
}