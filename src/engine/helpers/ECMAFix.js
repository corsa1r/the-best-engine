(function() {
    define(function() {
        /**
         * 
         * @param {Function} callback Callback function.
         * @returns {number} Timer id.
         */
        window.requestAnimationFrame =
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                (function(callback) {
                    return setTimeout(callback, 1000 / 60);
                });


        window.cancelRequestAnimaionFrame =
                window.cancelAnimationFrame ||
                window.webkitCancelRequestAnimationFrame ||
                window.mozCancelRequestAnimationFrame ||
                window.oCancelRequestAnimationFrame ||
                window.msCancelRequestAnimationFrame ||
                clearTimeout;


        if (!Date.now) {
            Date.now = function now() {
                return new Date().getTime();
            };
        }


        Function.prototype.getName = function() {
            return this.toString().match(/function ([^\(]*)/)[1];
        };


        Function.prototype.extend = function(ancestor) {
            function Prototype() {}
            Prototype.prototype = ancestor.prototype;
            this.prototype = new Prototype();
            this.prototype.constructor = this;
            this.super = ancestor.prototype;
        };


//        Object.prototype.combine = function (object) {
//            if (object instanceof Object) {
//                for(var id in object) {
//                    if (object.hasOwnProperty(id)) {
//                        if (this[id] instanceof Object) {
//                            this[id].combine(object[id]);
//                        } else {
//                            this[id] = object[id];
//                        }
//                    }
//                }
//            }
//        };
    });
})();