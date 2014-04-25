(function() {
    define(['src/engine/GameObject', 'src/engine/physics/Box2DPhysicsBody'], function(GameObject, Box2DPhysicsBody) {
        var Wall = function (physics, x, y, w, h) {
            Wall.super.constructor.call(this);
            this.x = x || 0;
            this.y = y || 0;
            this.w = w;
            this.h = h;
            
            this.c = '#007b90';
            
            this.physics = new Box2DPhysicsBody(physics, {
                type: 'static',
                x: this.x,
                y: this.y,
                width: this.w,
                height: this.h
            });
        };
        
        Wall.extend(GameObject);
        
        
        Wall.prototype.update = function () {
            this.physics_update();
        };
        
        Wall.prototype.physics_update = function () {
            var pos = this.physics.body.GetPosition();
            this.x = pos.x - this.w / 2;
            this.y = pos.y - this.h / 2;
        };
        
        Wall.prototype.draw = function (context) {
            context.beginPath();
            context.fillStyle = this.c;
            context.fillRect(this.x - this.camera.x, this.y - this.camera.y, this.w, this.h);
        };
        
        
        return Wall;
        
    });
})();