define([
    //Define Core classes
    'engine/Container',
    'engine/EventSet',
    
    //Define Game classes
    'engine/GameLoop',
    'engine/GameObject',
    
    //Define input classes
    'engine/input/StateMap',
    'engine/input/KeyboardInput',
    'engine/input/MouseInput',
    
    //Define camera/screen classes
    'engine/Screen',
    'engine/Camera',
    
    //Define Network class
    'engine/network/SocketNetwork',
    
    //Define Game Specific classes/modules
    'game/src/Assets',
    'game/src/Controlls',
    'game/src/Settings',
    'game/src/entities/Hero',
    'game/src/entities/Cube',
    'game/src/CommandsTranslator',
    'game/src/terrains/cube'
], function (
    //Engine modules
    Container,
    EventSet,
    GameLoop,
    GameObject,
    StateMap,
    KeyboardInput,
    MouseInput,
    Screen,
    Camera,
    SocketNetwork,
    
    //Game modules
    GameAssets,
    GameControlls,
    GameSettings,
    Hero,
    Cube,
    CommandsTranslator,
    CubeTerrain
    ){
    //Game init/logic starts here -----------------------------------------------------------------------------------------------------------------
    //
    //Init SCREEN
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var screen = new Screen(canvas);
    screen.setCanvasSize(1024, 500, true);
    var camera = new Camera(screen);
    
    //Init GameLoop
    var gameloop = new GameLoop;
    
    //Init Inputs
    var keyboard = new KeyboardInput;
    var mouse = new MouseInput(screen);
    
    //Init Network
    var network = new SocketNetwork;
    
    var gameobjects = [];
    
    gameloop.on('update', function (delta) {
        for(var x in gameobjects) {
            if(gameobjects[x].update) {
                gameobjects[x].update(delta, CubeTerrain);
            }
        }
    });
    
    gameloop.on('render', function () {
        context.clearRect(0, 0, screen.canvas.width, screen.canvas.height);
        
        for(var x in gameobjects) {
            if(gameobjects[x].draw) {
                gameobjects[x].draw(context);
            }
        }
    });
    
    var player = new Cube(100, 100, 50, 50);
    var playerKeyboardControlls = new StateMap();
    
    keyboard.on('output', playerKeyboardControlls.feed(KeyboardInput.keyMap));
    
    playerKeyboardControlls.on('output', function (e) {
        var command = CommandsTranslator(GameControlls.movement, e);
        
        if(command) {
            player.commands.push(command);
        }
    });
    
    gameobjects.push(player);
    
    gameloop.start();
    
    //Game init/logic ends here -------------------------------------------------------------------------------------------------------------------
});
































