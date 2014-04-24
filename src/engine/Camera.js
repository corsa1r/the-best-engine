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
            if(!w || !w instanceof Number) {
                w = 0;
            }
            if(!h || !h instanceof Number) {
                h = 0;
            }
            return Boolean(this.screen.innerPoint(x, y) || this.screen.innerPoint(x + w, y) || this.screen.innerPoint(x, y + h) || this.screen.innerPoint(x + w, y + h));
        };

        Camera.prototype.update = function(x, y) {
            this.fire('update', x, y);
            if (x && x instanceof Number) {
                this.x = x;
            }
            
            if (y && y instanceof Number) {
                this.y = y;
            }

            if (x !== this.x || y !== this.y) {
                this.fire('change', x, y);
            }
            return this;
        };
        
        Camera.prototype.lookAt = function (obj) {
            if((obj.x || obj.x === 0) && (obj.y || obj.y === 0)) {
                this.x = obj.x + (obj.w ? obj.w : 0) - this.screen.canvas.width >> 1;
                this.y = obj.y + (obj.h ? obj.h : 0) - this.screen.canvas.height >> 1;
                this.fire('change', this.x, this.y);
            }
        };

        return Camera;
    });
})();