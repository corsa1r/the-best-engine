(function() {
    define(['src/engine/physics/Box2DPhysics', 'src/engine/physics/PhysicsBody'], function(Physics, PhysicsBody) {
        var Body = function(physics, details) {
            Body.super.constructor.call(this);
            this.details = details || {};

            // Create the definition
            this.definition = new Physics.bodyDef();

            // Set up the definition
            for (var k in this.definitionDefaults) {
                this.definition[k] = details[k] || this.definitionDefaults[k];
            }

            this.definition.position = new Physics.vector2(details.x || 0, details.y || 0);
            this.definition.linearVelocity = new Physics.vector2(details.vx || 0, details.vy || 0);
            this.definition.userData = this;
            this.definition.type = details.type === "static" ? Physics.body.b2_staticBody : Physics.body.b2_dynamicBody;

            // Create the Body
            this.body = physics.world.CreateBody(this.definition);

            // Create the fixture
            this.fixtureDef = new Physics.fixtureDef();

            for (var l in this.fixtureDefaults) {
                this.fixtureDef[l] = details[l] || this.fixtureDefaults[l];
            }

            details.shape = details.shape || this.defaults.shape;

            switch (details.shape) {
                case "circle":
                    details.radius = details.radius || this.defaults.radius;
                    this.fixtureDef.shape = new Physics.circleShape(details.radius);
                    break;
                case "polygon":
                    this.fixtureDef.shape = new Physics.polygonShape();
                    this.fixtureDef.shape.SetAsArray(details.points, details.points.length);
                    break;
                case "block":
                default:
                    details.width = details.width || this.defaults.width;
                    details.height = details.height || this.defaults.height;

                    this.fixtureDef.shape = new Physics.polygonShape();
                    this.fixtureDef.shape.SetAsBox(details.width / 2, details.height / 2);
                    break;
            }

            this.body.CreateFixture(this.fixtureDef);
        };

        Body.extend(PhysicsBody);
        

        Body.prototype.defaults = {
            shape: "block",
            width: 100,
            height: 100,
            radius: 50
        };

        Body.prototype.fixtureDefaults = {
            density: 0.01,
            friction: 1,
            restitution: 0.3
        };

        Body.prototype.definitionDefaults = {
            active: true,
            allowSleep: true,
            angle: 0,
            angularVelocity: 0,
            awake: true,
            bullet: false,
            fixedRotation: false
        };

        return Body;
    });
})();