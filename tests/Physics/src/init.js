define([
    //Define Core classes
    'engine/Container',
    'engine/EventSet',
    //Define Game classes
    'engine/GameLoop',
    //Define input classes
    'engine/input/StateMap',
    'engine/input/KeyboardInput',
    'engine/input/MouseInput',
    //Define camera/screen classes
    'engine/Screen',
    'engine/Camera',
    'engine/physics/Box2DPhysics',
    'engine/physics/Box2DPhysicsBody',
    '../src/PlayerCube'
], function(Container, EventSet, GameLoop, StateMap, KeyboardInput, MouseInput, Screen, Camera, Physics, PhysicsBody, PlayerCube) {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var screen = new Screen(canvas);
    var camera = new Camera(screen);
    window.camera = camera;
    var gameloop = new GameLoop();
    var keyboard = new KeyboardInput();
    var mouse = new MouseInput(screen);

    var gameobjects = [];

    var physics = new Physics(gameloop, screen, {
        gravity: new Physics.vector2(0, 30)
    });

    physics.debug();
    physics.attachMouseInput(mouse);
    physics.dragNDrop(mouse);

    var ground = new PhysicsBody(physics, {type: 'static', x: 512, y: 600, width: 1000, height: 10});
    new PhysicsBody(physics, {type: 'static', x: 10, y: 600, width: 10, height: 1000});

    new PhysicsBody(physics, {type: 'static', x: 512, y: 600, width: 100, height: 100});
    new PhysicsBody(physics, {type: 'static', x: 612, y: 550, width: 100, height: 100});
    new PhysicsBody(physics, {type: 'static', x: 864, y: 600, width: 100, height: 1000});

//    for (var x = 2; x < 20; x++) {
//        for (var y = 1; y < 3; y++) {
//            new PhysicsBody(physics, {x: x + 6 * x + 10, y: 100 + (y * 6), width: 5, height: 5});
//        }
//    }

//    new PhysicsBody(physics, {shape: 'circle', x: 300, y: 300})

    var playerControlls = new StateMap();
    keyboard.on('output', playerControlls.feed(KeyboardInput.keyMap));

    playerControlls.on('output', function(e) {
        switch (e.which) {
            case 'SPACE':
                {
                    if (e.state) {
                        player.jump();
                    }
                    break;
                }
            case 'A':
                {
                    player.move_lstate = e.state;
                    break;
                }
            case 'D':
                {
                    player.move_rstate = e.state;
                    break;
                }
            case 'I':
                {
                    player.fired = e.state;
                    break;
                }
        }
    });

    var player = new PlayerCube(physics, camera);

    gameloop.on('update', function(delta) {
        for (var x in gameobjects) {
            if (gameobjects.hasOwnProperty(x) && gameobjects[x].update) {
                gameobjects[x].update(delta);
            }
        }
    });

    gameloop.on('render', function() {
//        screen.context.clearRect(0, 0, screen.canvas.width, screen.canvas.height);
        for (var x in gameobjects) {
            if (gameobjects.hasOwnProperty(x) && gameobjects[x].draw) {
                gameobjects[x].draw(screen.context);
            }
        }
    });

    gameobjects.push(player);
    gameloop.start();
});