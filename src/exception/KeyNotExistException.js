/*
 * Thrown when the configuration key provided does not exist.
 */
function KeyNotExistException(key) {
    this.key = key;

    this.toString = function() {
        return "Config key '" + this.key + "' does not exist.";
    }
}

module.exports = KeyNotExistException;