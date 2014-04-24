(function() {
    define(['engine/physics/Box2DPhysicsBody'], function(Box2DPhysicsBody) {
        var PlayerCube = function(physics, camera) {
            this._p_ref = physics;
            this.camera = camera;
            this.img = new Image();
            this.img.src = 'Physics/pep.png';

            this.w = 70;
            this.h = 123;
            this.x = 100;
            this.y = 100;

            this.ms = 30;

            this.move_lstate = false;
            this.move_rstate = false;

            this.physics = new Box2DPhysicsBody(this._p_ref, {
                x: this.x,
                y: this.y,
                width: this.w,
                height: this.h,
                fixedRotation: true
            });
            
            this.scale_x = 1;
        };

        PlayerCube.prototype.update = function(delta) {
            this.physics_update(delta);

            if (this.move_lstate) {
                this.moveLeft();
            }

            if (this.move_rstate) {
                this.moveRight();
            }

            this.camera.x = this.x - (this.camera.screen.canvas.width >> 1);
            this.camera.y = this.y - (this.camera.screen.canvas.height >> 1);
            
            if(this.fired) {
                this.fire();
            }
        };

        PlayerCube.prototype.physics_update = function() {
            var pos = this.physics.body.GetPosition();
            this.x = pos.x - this.w / 2;
            this.y = pos.y - this.h / 2;
            this.a = this.physics.body.GetAngle();
            delete pos;
        };

        PlayerCube.prototype.draw = function(context) {
            context.save();
            context.beginPath();
            context.translate(0 + 20 * this.scale_x, 0);
            context.scale(this.scale_x, 1);
            context.drawImage(this.img, 0, 0, 96.33, this.h, this.x * this.scale_x - this.w + 30 * this.scale_x, this.y, 96.33, this.h);
            context.restore();
        };

        PlayerCube.prototype.jump = function() {
            this.physics.body.ApplyImpulse({x: 0, y: -800000}, this.physics.body.GetWorldCenter());
        };

        PlayerCube.prototype.moveLeft = function() {
            var vel = this.physics.body.GetLinearVelocity();
            vel.x = this.move_lstate ? -this.ms : 0;
            this.physics.body.SetLinearVelocity(vel);
            this.scale_x = -1;
        };

        PlayerCube.prototype.moveRight = function() {
            var vel = this.physics.body.GetLinearVelocity();
            vel.x = this.move_rstate ? this.ms : 0;
            this.physics.body.SetLinearVelocity(vel);
            this.scale_x = 1;
        };

        PlayerCube.prototype.fire = function() {
            var bullet = new Box2DPhysicsBody(this._p_ref, {
                x: (this.x + this.w / 2) + (this.scale_x * 60),
                y: this.y + this.h / 2,
                width: 3,
                height: 3,
                fixedRotation: false,
                rotation: 45,
                radius: 5,
                
            });

            bullet.body.ApplyImpulse({x: 1000000 * this.scale_x, y: 0}, bullet.body.GetWorldCenter());

            setTimeout((function () {
                this._p_ref.world.DestroyBody(bullet.body);
            }).bind(this), 2000);
        };

        return PlayerCube;
    });
})();