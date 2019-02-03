'use strict';

class KeyNotExist {
    constructor(key) {
        this.key = key;
    }
    
    toString() {
        return "Config key '" + this.key + "' does not exist.";
    }
}

module.exports = KeyNotExist;