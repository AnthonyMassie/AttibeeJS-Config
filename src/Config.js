'use strict';

var KeyNotExist = require('./exception/Exception');
var FilterFailed = require('./exception/FilterFailed');

class Config {
    constructor(config, defaults, filters) {
        this.config = config || {};
        this.defaults = defaults || {};
        this.filters = filters || {};
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
    set(key, value) {
        if(typeof key === 'string') {
            var filter = function() { return true; }; //default filter always returns true

            //filter exists for this value
            if(this.filters.hasOwnProperty(key)) {
                filter = this.filters[key];
            }

            //filter value
            if(filter(value)) {
                this.config[key] = value;
            } else {
                throw new FilterFailed(filter);
            }
        } else if(typeof key === 'object') {
            var config = key;

            for(var key in config) {
                this.setConfig(key, config[key]);
            }
        }

       return false;   
    }
    
    /**
     * Deletes the user-provided configuration key.
     * @param {String} key the unique configuration key
     */
    delete(key) {
       delete this.config[key];
    }
    
    /**
    * Returns the configuration value given the unique key.
    * @param {String} key The config's unique key
    * @returns {Mixed} Returns the value of the config.
    */
    get(key) {
       if(this.config.hasOwnProperty(key)) {
           return this.config[key];
       } else if(this.defaults.hasOwnProperty(key)) {
           return this.defaults[key];
       } else {
           throw new KeyNotExist(key);
       }
    }
   
    /**
     * Set the filters. A filter is a callback that accepts the config's value
     * and returns true or false if it's valid input. If no filter is provided, the
     * config always returns true.
     * @param {Object} filters Object of key: callback pairs defining the filter for each key.
     */
    setFilters(filters) {
       this.filters = filters;
    }

    /**
     * Sets the default values for a key. An object literal with key: default_value pairs
     * is used.
     * @param {Object} defaults Object literal of key: default_value pairs.
     */
    setDefaults(defaults) {
        this.defaults = defaults;
    }
}

module.exports = Config;