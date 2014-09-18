(function() {
    define(function() {
        Function.prototype.extend = function(ancestor) {
            function Prototype() {
            }
            Prototype.prototype = ancestor.prototype;
            this.prototype = new Prototype();
            this.prototype.constructor = this;
            this.super = ancestor.prototype;
        };
    });
})();