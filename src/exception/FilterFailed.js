'use strict';

class FilterFailed {
    constructor(filter) {
        this.message = filter.getMessage();
    }
    
    toString() {
        return "Filter failed with message '" + this.key + "'";
    }
}

module.exports = FilterFailed;