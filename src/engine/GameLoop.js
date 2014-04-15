(function() {
    define(['engine/EventSet'], function(EventSet) {
        /*
         * A GameLoop object.
         * 
         * @constructor
         * @returns {GameLoop}
         */
        function GameLoop() {
            GameLoop.super.constructor.call(this);
        }

        GameLoop.extend(EventSet);


        GameLoop.prototype.start = function() {
            if (this.clock === undefined) {
                this.time = Date.now();
                this.clock = requestAnimationFrame(this.loop.bind(this));
            }
        };


        GameLoop.prototype.stop = function() {
            if (this.clock !== undefined) {
                cancelRequestAnimaionFrame(this.clock);
                delete this.clock;
            }
        };


        GameLoop.prototype.loop = function() {
            var now = (new Date()).getTime(),
                    delta = now - this.time;
            this.time = now;

            this.each((function(step) {
                step.call(delta);
                return true;
            }).bind(this));

            if (this.clock !== undefined) {
                this.clock = requestAnimationFrame(this.loop.bind(this));
            }
        };


        GameLoop.prototype.isRunning = function() {
            return Boolean(this.clock);
        };

        return GameLoop;
    });
})();