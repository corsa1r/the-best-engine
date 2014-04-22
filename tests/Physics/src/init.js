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
    'engine/physics/Box2DPhysicsBody'
], function(Container, EventSet, GameLoop, StateMap, KeyboardInput, MouseInput, Screen, Camera, Physics, PhysicsBody) {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var screen = new Screen(canvas);
    var camera = new Camera(screen);
    var gameloop = new GameLoop();
    var keyboard = new KeyboardInput();
    var mouse = new MouseInput(screen);

    var physics = new Physics(gameloop, screen, {
        gravity: new Physics.vector2(0, 300)
    });


    physics.debug();
    physics.attachMouseInput(mouse);

    new PhysicsBody(physics, {type: 'static', x: 512, y: 10, width: 1000, height: 10});
    var ground = new PhysicsBody(physics, {type: 'static', x: 512, y: 600, width: 1000, height: 10});

    new PhysicsBody(physics, {type: 'static', x: 10, y: 305, width: 10, height: 600});
    new PhysicsBody(physics, {type: 'static', x: 1010, y: 305, width: 10, height: 600});

    new PhysicsBody(physics, {x: 100, y: 100, width: 100, height: 3});
    new PhysicsBody(physics, {x: 110, y: 100, width: 10, height: 30});
    new PhysicsBody(physics, {x: 120, y: 100, width: 10, height: 30});
    new PhysicsBody(physics, {x: 130, y: 100, width: 10, height: 30});
    new PhysicsBody(physics, {x: 140, y: 100, width: 10, height: 30});
    new PhysicsBody(physics, {x: 150, y: 100, width: 10, height: 30});
    new PhysicsBody(physics, {x: 160, y: 100, width: 10, height: 30});
    new PhysicsBody(physics, {x: 170, y: 100, width: 10, height: 30});
    new PhysicsBody(physics, {x: 180, y: 100, width: 10, height: 30});
    new PhysicsBody(physics, {x: 190, y: 100, width: 10, height: 30});
    new PhysicsBody(physics, {color: "pink", shape: "polygon", points: [{x: 0, y: 0}, {x: 0, y: 40}, {x: -100, y: 0}],x: 200, y: 50});


    var box = new PhysicsBody(physics, {x: 201, y: 100});
    var ball = new PhysicsBody(physics, {shape: 'circle', x: 152, y: 400, radius: 100});

    ball.on('output', function(f, e) {
        if (e.which === 'RMB') {
            ball.body.ApplyImpulse({x: 2000000, y: -2000000}, ball.body.GetWorldCenter());
        }
    });

//    ball.on('collide', function (withBody) {
//        if(withBody === ground) {
//            ball.body.ApplyImpulse({ x: 0, y: -10000000 }, ball.body.GetWorldCenter());
//        }
//    });

//    physics.on('output', function (body, fixture, e) {
//        console.warn(body.GetUserData() === ball);        
//        if(e.which === 0 && e.state) {
//            body.ApplyImpulse({ x: 10000000, y: -10000000 }, body.GetWorldCenter());
//        }
//    });

    physics.dragNDrop(mouse);
    gameloop.start();
});