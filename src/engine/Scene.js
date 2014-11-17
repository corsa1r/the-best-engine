;
(function () {

    "use strict";

    define([
        'src/engine/EventSet',
        'src/engine/Container',
        'src/engine/helpers/AdvancedContainer',
        'src/engine/GameLoop',
        'src/engine/Screen',
        'src/engine/GameObject',
        'src/engine/Camera',
        'src/engine/helpers/resources/ResourceLoader',
        'src/lib/q',
        'src/engine/physics/Physics'
    ], function (EventSet, Container, AdvancedContainer, GameLoop, Screen, GameObject, Camera, ResourceLoader, q, Physics) {

        var Scene = function (canvas, width, height) {
            Scene.super.constructor.call(this);

            this.resourceLoader = new ResourceLoader();

            this.resources = null;

            this.objects = new AdvancedContainer();

            this.objects.setAdvancedOnAdd('init', 'init', this);
            this.objects.setAdvancedOnRemove('destroy', 'destroy', this);

            this.gameLoop = new GameLoop();

            this.screen = new Screen(canvas);
            this.screen.setCanvasSize(width, height);

            this.camera = new Camera(this.screen);

            this.gameLoop.on('update', this.$update.bind(this));
            this.gameLoop.on('draw', this.$draw.bind(this));
            this.physics = new Physics(this);
        };

        Scene.extend(EventSet);

        Scene.prototype.$update = function (delta) {
            
            this.physics.world.step(delta);

            this.objects.each((function (gameObject) {
                if (gameObject instanceof GameObject) {
                    if (!gameObject.resources || gameObject.resources !== this.resources) {
                        gameObject.resources = this.resources;
                    }

                    gameObject.update(delta, this);

                    gameObject.components.each((function(component) {
                        component.update(delta, this);
                    }).bind(this));

                    gameObject.fire('updated', delta, this);
                }
            }).bind(this));
        };

        Scene.prototype.$draw = function (delta) {
            this.screen.context.clearRect(0, 0, this.screen.canvas.width, this.screen.canvas.height);

            this.objects.each((function (gameObject) {
                if (gameObject instanceof GameObject) {
                    if (this.camera.inViewPort(gameObject.position.x, gameObject.position.y, gameObject.size.x, gameObject.size.y)) {
                        gameObject.draw(this.screen, this.camera, delta);

                        gameObject.components.each((function(component) {
                            component.draw(this.screen, this.camera, delta);
                        }).bind(this));

                        gameObject.fire('drawed', delta, this.screen);
                    }
                }
            }).bind(this));
        };

        Scene.prototype.findObjectsByClass = function (ClassRef) {
            var objects = new Container();

            this.objects.each((function (gameObjectRef) {
                if (gameObjectRef instanceof ClassRef) {
                    objects.add(gameObjectRef);
                }
            }).bind(this));

            return objects;
        };

        Scene.prototype.init = function () {
            var defer = q.defer();

            this.fire('init.start');

            this.resourceLoader.on('load.one', (function (resourceFile, percents) {
                this.fire('init.progress', resourceFile, percents);
                defer.notify(resourceFile, percents);
            }).bind(this));

            this.resourceLoader.load().then((function ($resources) {
                this.resources = $resources;
                this.fire('init.end');
                defer.resolve(this);
            }).bind(this), defer.reject);

            return defer.promise;
        };

        return Scene;
    });
})();