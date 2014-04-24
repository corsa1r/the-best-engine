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
    'lib/DatGui',
    '../src/CameraControlls',
    '../src/entities/Cube',
    '../src/entities/Ground',
    '../src/gui/GuiCamera',
    '../src/gui/GuiGame'
], function(Container, EventSet, GameLoop, StateMap, KeyboardInput, MouseInput, Screen, Camera, Physics, PhysicsBody, DatGui, cameraControlls, Cube, Ground, guiCamera, guiGame) {
    var canvas = document.getElementById('canvas');
    
    var screen = new Screen(canvas);
    screen.setCanvasSize(window.innerWidth - 10, window.innerHeight - 10);

    var camera = new Camera(screen);
    
    var gameloop = new GameLoop();
    
    var keyboard = new KeyboardInput();
    var mouse = new MouseInput(screen);
    
    var objects = new Container();
    
    var physics = new Physics(gameloop, screen, {
        gravity: {x: 0, y: 3}
    });
    
//    physics.debug();
    physics.attachMouseInput(mouse, camera);
    physics.on('output', function (e) {
        console.warn(e);
    });
    
    var gui = new DatGui({
        load: localStorage.getItem(window.location.href+".gui")
    });
    
    //------------------------------------------------------------------------------------------
    //Add GUI's
    new cameraControlls(mouse, camera);
    new guiCamera(gui, camera);
    var theGuiGame = new guiGame(gui, gameloop);
    //Add GUI's ends
    //------------------------------------------------------------------------------------------
    
    var ground = new Ground(physics);
    ground.affectWithCamera(camera);
    
    var cube = new Cube(physics);
    cube.affectWithCamera(camera);
    
    objects.add(ground);
    objects.add(cube);

    theGuiGame.on('update', function (delta) {
        objects.each(function (entity) {
            if(entity.update) {
                entity.update(delta);
            }
        });
        physics.step();
    });
    
    gameloop.on('render', function (delta) {
        if(!physics.debugDraw) {
            screen.context.clearRect(0, 0, screen.canvas.width, screen.canvas.height);
        }
        objects.each(function (entity) {
            if(entity.draw) {
                entity.draw(screen.context);
            }
        });
    });
    
    gameloop.start();
});