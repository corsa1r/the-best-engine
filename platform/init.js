(function() {
    define([
        'src/engine/Container',
        'src/engine/EventSet',
        'src/engine/Screen',
        'src/engine/Camera',
        'src/engine/GameLoop',
        'src/engine/input/StateMap',
        'src/engine/input/KeyboardInput',
        'src/engine/input/MouseInput',
        'src/engine/input/TouchInput',
        'src/engine/physics/Box2DPhysics',
        'src/engine/physics/Box2DPhysicsBody',
        'src/lib/DatGui',
        
        'platform/src/physics/options',
        'platform/src/guis/GuiCamera',
        'platform/src/guis/GuiScreen',
        'platform/src/guis/GuiPhysics',
        'platform/src/controllers/PlatformCameraController',
        'platform/src/controllers/PlatformLoop',
        'platform/src/guis/GuiGame',
        'platform/src/controllers/PlatformLoopObjects',
        
        'platform/src/objects/Cube',
        'platform/src/objects/Wall'
    ], function(Container, EventSet, Screen, Camera, GameLoop, StateMap, KeyboardInput, MouseInput, TouchInput, Box2DPhysics, Box2DPhysicsBody, DatGui, physicsOptions, GuiCamera, GuiScreen, GuiPhysics, PlatformCameraController, PlatformLoop, GuiGame, PlatformLoopObjects, Cube, Wall) {
        /*
         * Iitializing the important classes.
         */
        var canvas    = document.getElementById('canvas');
        var screen    = new Screen(canvas);
        var camera    = new Camera(screen);
        var gameloop  = new GameLoop();
        var keyboard  = new KeyboardInput();
        var mouse     = new MouseInput(screen);
        var touch     = new TouchInput(screen);
        var physics   = new Box2DPhysics(screen, physicsOptions);
        var gui       = new DatGui();
        /*
         * End of initializing of the important classes.
         */
        
        //Fit the screen to the window sizes
        screen.setCanvasSize(window.innerWidth - 10, window.innerHeight - 10);
        
        //Container for all objects in the scene
        var sceneObjects = new Container();
        
        //Add controllers
        new PlatformCameraController(mouse, camera);
        var platformLoop = new PlatformLoop(gameloop);
        new PlatformLoopObjects(platformLoop, sceneObjects, physics, screen);
        
        //Add guis
        new GuiCamera(gui, camera);
        new GuiScreen(gui, screen);
        new GuiPhysics(gui, physics);
        new GuiGame(gui, platformLoop);
        
        var ground = new Wall(physics, 0, 500, 2000, 30);
        ground.affectWithCamera(camera);
        sceneObjects.add(ground);
        
        var cube = new Cube(physics, 100, 100, 100, 100);
        cube.affectWithCamera(camera);
        sceneObjects.add(cube);
        
        
        var cube = new Cube(physics, 190, 400, 100, 100);
        cube.affectWithCamera(camera);
        sceneObjects.add(cube);
        
//        physics.debug();
        
        gameloop.start();
    });
})();