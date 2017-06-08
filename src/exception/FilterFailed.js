'use strict';

export default class FilterFailed {
    constructor(filter) {
        this.message = filter.getMessage();
    }
    
    toString() {
        return "Filter failed with message '" + this.key + "'";
    }
}