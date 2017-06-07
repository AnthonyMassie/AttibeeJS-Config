function Filter() {
    this.message = '';
}

Filter.prototype.toString = function() {
    return this.message;
}

Filter.prototype.filter = function(value) {
    return true;
}