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
    });
})();