(function() {
    define(['engine/GameObject', 'engine/physics/Box2DPhysicsBody'], function(GameObject, Box2DPhysicsBody) {
        var Ground = function (physics) {
            Ground.super.constructor.call(this);
            this.x = -1000;
            this.y = 500;
            this.w = 10000;
            this.h = 30;
            this.c = '#2aac95';
            
            this.physics = new Box2DPhysicsBody(physics, {
                x: this.x,
                y: this.y,
                width: this.w,
                height: this.h,
                fixedRotation: false,
                type: 'static'
            });
            
            this.physics.on('collide', (function () {
                this.physics.body.ApplyImpulse({x: 1000000000, y: -10000000000}, this.physics.body.GetWorldCenter());
            }).bind(this));
        };
        
        Ground.extend(GameObject);
        
        
        Ground.prototype.draw = function (context) {
            context.beginPath();
            context.fillStyle = this.c || 'black';
            context.fillRect(this.x - this.camera.x - this.w / 2, this.y - this.camera.y - this.h / 2, this.w, this.h);
            context.closePath();
        };
        
        return Ground;
    });
})();