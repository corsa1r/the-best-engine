(function() {
    define(function() {
        Function.prototype.getName = function() {
            return this.toString().match(/function ([^\(]*)/)[1];
        };
    });
})();