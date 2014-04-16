(function() {
    define(['engine/helpers/ECMAFixes', 'engine/GameObject'], function(a, GameObject) {
        function Torpedo(x, y, vx, vy, c) {
            Torpedo.super.constructor.call(this);
            this.x = x;
            this.y = y;

            this.vx = vx;
            this.vy = vy;

            this.w = 10;
            this.h = 10;

            this.c = c;
        }
        
        Torpedo.extend(GameObject);
        
        

        Torpedo.prototype.update = function(delta) {
            this.x += (this.vx * delta);
            this.y += (this.vy * delta);
        };

        Torpedo.prototype.draw = function(context) {
            context.beginPath();
            context.fillStyle = this.c;
            context.rect(this.x, this.y, this.w, this.h);
        };

        Torpedo.prototype.networkDependenciesAsset = ['x', 'y', 'vx', 'vy', 'c'];
        
        return Torpedo;
    });
})();