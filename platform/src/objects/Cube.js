(function() {
    define(['src/engine/GameObject', 'src/engine/physics/Box2DPhysicsBody'], function(GameObject, Box2DPhysicsBody) {
        var Cube = function (physics, x, y, w, h) {
            Cube.super.constructor.call(this);
            this.x = x || 0;
            this.y = y || 0;
            this.w = w;
            this.h = h;
            
            this.a = 0;
            this.c = '#000000';
            
            this.physics = new Box2DPhysicsBody(physics, {
                x: this.x,
                y: this.y,
                width: this.w,
                height: this.h,
                angle: this.a,
                fixedRotation: false
            });
            
            this.physics.on('collide', (function () {
                
            }).bind(this));
        };
        
        Cube.extend(GameObject);
        
        
        Cube.prototype.update = function () {
            this.physics_update();
        };
        
        Cube.prototype.physics_update = function () {
            var pos = this.physics.body.GetPosition();
            this.x = pos.x - this.w / 2;
            this.y = pos.y - this.h / 2;
            
            this.a = this.physics.body.GetAngle();
        };
        
        Cube.prototype.draw = function (context) {
            context.beginPath();
            context.save();
            context.translate(this.x + this.w / 2 - this.camera.x, this.y + this.h / 2 - this.camera.y);
            context.rotate(this.a);
            context.fillStyle = this.c;
            context.fillRect(-this.w / 2, -this.h / 2, this.w, this.h);
            context.restore();
        };
        
        
        return Cube;
        
    });
})();