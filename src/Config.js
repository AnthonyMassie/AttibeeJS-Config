'use strict';

var KeyNotExistException = require('exception/KeyNotExistException');

function Config() {
    this.config = {};
    this.defaults = {};
    this.filters = {};
}

/**
 * Sets a configuration given parameters key and value or an object literal of key: value pairs.
 * 
 * Usage:
 * 
 * Config.setConfig('color', 'red');
 * Config.setConfig({
 *     'color': 'red',
 *     'border': 'black'
 * });
 * 
 * @param {Mixed} key The configuration's unique key or an object literal of key: value
 * @param {Mixed} value The value may be any type.
 * @return {Boolean} Returns true if the key's value was set, or false if the key's filter rejected the value.
 */
Config.prototype.setConfig = function(key, value) {
    if(typeof key === 'string') {
        var filter = function() { return true; }; //default filter always returns true
        
        //filter exists for this value
        if(this.filters.hasOwnProperty(key)) {
            filter = this.filters[key];
        }
            
        //filter value
        if(filter(value)) {
            this.config[keys] = value;
        } else {
            throw 'Filter failed.'
        }
    } else if(typeof key === 'object') {
        var config = key;
        
        for(var key in config) {
            this.setConfig(key, config[key]);
        }
    }
    
    return false;
};

/**
 * Returns the configuration value given the unique key.
 * @param {String} key The config's unique key
 * @returns {Mixed} Returns the value of the config.
 */
Config.prototype.getConfig = function(key) {
    if(this.config && this.config.hasOwnProperty(key)) {
        return this.config[key];
    } else if(this.defaults && this.defaults.hasOwnProperty(key)) {
        return this.defaults[key];
    } else {
        throw new KeyNotExistException(key);
    }
};

/**
 * Set the filters. A filter is a callback that accepts the config's value
 * and returns true or false if it's valid input. If no filter is provided, the
 * config always returns true.
 * @param {Object} filters Object of key: callback pairs defining the filter for each key.
 */
Config.prototype.setFilters = function(filters) {
    this.filters = filters;
};

/**
 * Sets the default values for a key. An object literal with key: default_value pairs
 * is used.
 * @param {Object} defaults Object literal of key: default_value pairs.
 */
Config.prototype.setDefaults = function(defaults) {
        this.defaults = defaults;
};

module.exports = Config;