(function() {
    define(['engine/physics/Physics', 'lib/Box2dWeb', 'engine/GameLoop', 'engine/Screen', 'engine/input/StateMap', 'engine/input/MouseInput'], function(Physics, Box2D, GameLoop, Screen, StateMap, MouseInput) {

        /**
         * Box2D Physics interface
         * @param {Object} screen - refference to a screen
         * @param {Object} options - world options, such as gravity, scale etc..
         * @returns {_L2.Box2DPhysics}
         */
        function Box2DPhysics(screen, options) {
            Box2DPhysics.super.constructor.call(this);

            if (!screen) {
                throw new Error('Invalid arguments, Box2DPhysics constructor');
            }

            if (!screen instanceof Screen) {
                throw new Error('Second argument must be instance of Screen');
            }

            if (!options) {
                options = {};
            }

            this.options = options;

            this.screen = screen;       //This is engine/Screen

            //Initialize gravity
            var gravity = new Box2DPhysics.vector2(options.gravity ? options.gravity.x : 0, options.gravity ? options.gravity.y : 0);
            //Initialize world with this gravity
            this.world = new Box2DPhysics.world(gravity, false);
            console.warn(this.world);
            //Canvas screen and context(debug draw only)
            this.element = screen.canvas;
            this.context = screen.context;

            //Graphical scale
            this.scale = options.scale || 1;

            //Physical steps per second
            this.dtRemaining = 0;
            this.stepAmount = options.stepAmount || 1 / 60;

            //Attach handler to gameloop update, for physics steps
            this.collision();
        }

        Box2DPhysics.extend(Physics);

        /**
         * Move physics with one step
         * @param {Number} delta this is gameloop delta time
         * @returns {undefined}
         */
        Box2DPhysics.prototype.step = function() {
            this.world.Step(this.stepAmount, 8, 3);
            
            if (this.debugDraw) {
                this.world.DrawDebugData();
            }
        };

        Box2DPhysics.prototype.debug = function() {
            this.debugDraw = new Box2DPhysics.debugDraw();
            this.debugDraw.SetSprite(this.context);
            this.debugDraw.SetDrawScale(this.scale);
            this.debugDraw.SetFillAlpha(0.3);
            this.debugDraw.SetLineThickness(1.0);
            this.debugDraw.SetFlags(Box2DPhysics.debugDraw.e_shapeBit | Box2DPhysics.debugDraw.e_jointBit);
            this.world.SetDebugDraw(this.debugDraw);
        };

        Box2DPhysics.prototype.attachMouseInput = function(mouseInput, camera) {
            var inputState = new StateMap();

            mouseInput.on('output', inputState.feed(MouseInput.buttonMap));

            inputState.on('output', (function(e) {
                this.world.QueryPoint((function(fixture) {
                    fixture.GetBody().GetUserData().fire('output', fixture, e);
                    this.fire('output', fixture.GetBody(), fixture, e);
                }).bind(this), {x: e.x + camera.x, y: e.y + camera.y});
            }).bind(this));
        };

        Box2DPhysics.prototype.collision = function() {
            this.listener = new Box2D.Dynamics.b2ContactListener();
            this.listener.PostSolve = (function(contact, impulse) {

                var bodyA = contact.GetFixtureA().GetBody().GetUserData();
                var bodyB = contact.GetFixtureB().GetBody().GetUserData();

                bodyA.fire('collide', bodyB, impulse);
                bodyB.fire('collide', bodyA, impulse);

                this.fire('collision', bodyA, bodyB, impulse);

            }).bind(this);
            this.world.SetContactListener(this.listener);
        };

        Physics.prototype.dragNDrop = function(mouseInput) {
            var obj = null;
            var joint = null;

            mouseInput.on('output', (function(e) {
                if (e.state) {
                    var point = {x: e.x, y: e.y};
                    this.world.QueryPoint(function(fixture) {
                        obj = fixture.GetBody().GetUserData();
                    }, point);
                } else {
                    obj = null;
                    if (joint) {
                        this.world.DestroyJoint(joint);
                        joint = null;
                    }
                }
            }).bind(this));

            mouseInput.on('move', (function(e) {
                if (!obj) {
                    return;
                }

                var point = {x: e.x, y: e.y};

                if (!joint) {
                    var jointDefinition = new Box2D.Dynamics.Joints.b2MouseJointDef();

                    jointDefinition.bodyA = this.world.GetGroundBody();
                    jointDefinition.bodyB = obj.body;
                    jointDefinition.target.Set(point.x, point.y);
                    jointDefinition.maxForce = 100000 * (this.options.gravity ? this.options.gravity.x + this.options.gravity.y : 100);
                    jointDefinition.timeStep = this.stepAmount;
                    joint = this.world.CreateJoint(jointDefinition);
                }

                joint.SetTarget(new Box2DPhysics.vector2(point.x, point.y));
            }).bind(this));
        };

        Box2DPhysics.vector2 = Box2D.Common.Math.b2Vec2;
        Box2DPhysics.bodyDef = Box2D.Dynamics.b2BodyDef;
        Box2DPhysics.body = Box2D.Dynamics.b2Body;
        Box2DPhysics.fixtureDef = Box2D.Dynamics.b2FixtureDef;
        Box2DPhysics.fixture = Box2D.Dynamics.b2Fixture;
        Box2DPhysics.world = Box2D.Dynamics.b2World;
        Box2DPhysics.massData = Box2D.Collision.Shapes.b2MassData;
        Box2DPhysics.polygonShape = Box2D.Collision.Shapes.b2PolygonShape;
        Box2DPhysics.circleShape = Box2D.Collision.Shapes.b2CircleShape;
        Box2DPhysics.debugDraw = Box2D.Dynamics.b2DebugDraw;

        return Box2DPhysics;
    });
})();