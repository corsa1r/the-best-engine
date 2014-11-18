/**
 * @file implements Camera class
 * @author CORSAIR <vladimir.corsair@gmail.com>
 * 
 */
(function() {
    define(['src/engine/EventSet', 'src/engine/physics/Vector'], function(EventSet, Vector) {
        var Camera = function(screen) {
            Camera.super.constructor.call(this);
            this.screen = screen;
            
            this.position = new Vector(0, 0);
        };

        Camera.extend(EventSet);

        Camera.prototype.inViewPort = function(position, size) {
            return Boolean(this.screen.innerPoint(position) || this.screen.innerPoint(size));
        };

        return Camera;
    });
})();