(function() {
    define(['engine/GameObject', 'engine/physics/Box2DPhysicsBody'], function(GameObject, Box2DPhysicsBody) {
        var Cube = function (physics) {
            Cube.super.constructor.call(this);
            this.x = 0;
            this.y = 0;
            this.w = 100;
            this.h = 100;            

            this.physics = new Box2DPhysicsBody(physics, {
                x: this.x,
                y: this.y,
                width: this.w,
                height: this.h,
                fixedRotation: false
            });
        };
        
        Cube.extend(GameObject);
        
        
        Cube.prototype.update = function () {
            var pos = this.physics.body.GetPosition();
            this.x = pos.x;
            this.y = pos.y;
        };
        
        Cube.prototype.draw = function (context) {
            context.beginPath();
            context.fillStyle = this.c || 'black';
            context.fillRect(this.x - this.camera.x - this.w / 2, this.y - this.camera.y - this.w / 2, this.w, this.h);
            context.closePath();
        };
        
        
        return Cube;
    });
})();