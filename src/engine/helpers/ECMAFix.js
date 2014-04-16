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
            function Prototype() {
            }
            Prototype.prototype = ancestor.prototype;
            this.prototype = new Prototype();
            this.prototype.constructor = this;
            this.super = ancestor.prototype;
        };
        
//        Function.defineProperty(Function, 'extend', {value: function(ancestor) {
//            function Prototype() {
//            }
//            Prototype.prototype = ancestor.prototype;
//            this.prototype = new Prototype();
//            this.prototype.constructor = this;
//            this.super = ancestor.prototype;
//        }});

        if (!Function.prototype.bind) {
            Function.prototype.bind = function(oThis) {
                if (typeof this !== "function") {
                    // closest thing possible to the ECMAScript 5 internal IsCallable function
                    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
                }

                var aArgs = Array.prototype.slice.call(arguments, 1),
                        fToBind = this,
                        fNOP = function() {},
                        fBound = function() {
                            return fToBind.apply(
                                    this instanceof fNOP && oThis ? this : oThis,
                                    aArgs.concat(Array.prototype.slice.call(arguments))
                                    );
                        };
                fNOP.prototype = this.prototype;
                fBound.prototype = new fNOP();

                return fBound;
            };
        }
        
        Object.defineProperty(Object, 'combine', {value: function(object) {
                if (object instanceof Object) {
                    for (var id in object) {
                        if (object.hasOwnProperty(id)) {
                            if (this[id] instanceof Object) {
                                this[id].combine(object[id]);
                            } else {
                                this[id] = object[id];
                            }
                        }
                    }
                }
            }});
    });
})();