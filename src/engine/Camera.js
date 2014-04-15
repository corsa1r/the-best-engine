/**
 * @file implements Camera class
 * @author CORSAIR <vladimir.corsair@gmail.com>
 * 
 */
(function() {
    define(['engine/EventSet'], function(EventSet) {
        var Camera = function(screen) {
            Camera.super.constructor.call(this);
            this.screen = screen;
            this.x = 0;
            this.y = 0;
        };

        Camera.extend(EventSet);

        Camera.prototype.inViewPort = function(x, y, w, h) {
            return Boolean(this.screen.innerPoint(x, y) || this.screen.innerPoint(x + w, y) || this.screen.innerPoint(x, y + h) || this.screen.innerPoint(x + w, y + h));
        };

        Camera.prototype.update = function(x, y) {
            this.fire('update', x, y);
            if (x && y) {
                if (x !== this.x || y !== this.y) {
                    this.fire('change', x, y);
                }
                this.x = x;
                this.y = y;
            }

            return this;
        };

        return Camera;
    });
})();