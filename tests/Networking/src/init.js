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
    'engine/network/SocketNetwork',
    '../src/entities/Player',
    '../src/CommandsTranslator',
    '../src/Controlls'
], function(Container, EventSet, GameLoop, StateMap, KeyboardInput, MouseInput, Screen, Camera, SocketNetwork, Player, CommandsTranslator, Controlls) {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var screen = new Screen(canvas);
    var camera = new Camera(screen);
    var gameloop = new GameLoop();
    var keyboard = new KeyboardInput();
    var mouse = new MouseInput(screen);
    var gameobjects = [];

    var network = new SocketNetwork();

    network.register('Cube', Player);

    network.connect('http://162.243.88.66:10888/');

    var gameInitialized = false;

    network.socket.on('connect', function() {
        document.getElementById('connection-error').style.display = 'none';
        document.getElementById('connecting').style.display = 'none';
        if (gameInitialized) {
            gameloop.start();
        } else {
            gameInit();
            gameInitialized = true;
        }
    });

    network.socket.on('error', function() {
        document.getElementById('connecting').style.display = 'none';
        document.getElementById('connection-error').style.display = 'block';
        gameloop.stop();
    });

    network.socket.on('disconnect', function() {
        document.getElementById('connecting').style.display = 'none';
        document.getElementById('connection-error').style.display = 'block';
        gameloop.stop();
    });

    gameloop.on('update', function(delta) {
        for (var x in gameobjects) {
            if (gameobjects.hasOwnProperty(x) && gameobjects[x].update) {
                gameobjects[x].update(delta, {x: 0, y: 0, w: 1024, h: 500});
            }
        }
    });

    gameloop.on('render', function() {
        context.clearRect(0, 0, screen.canvas.width, screen.canvas.height);
        for (var x in gameobjects) {
            if (gameobjects.hasOwnProperty(x) && gameobjects[x].draw) {
                gameobjects[x].draw(context);
            }
        }
    });

    function gameInit() {
        var player = new Player(Math.random() * 300, 100, 50, 50);

        network.socket.emit('login', player.getRepr());
        network.socket.on('logged', function(network_id, objects) {
            
            console.warn(network_id);
            
            for(var x in objects) {
                if(objects[x]) {
                    gameobjects[x] = new network.classes[objects[x].networkClassName](gameobjects).repr(objects[x]);
                }
            }

            var playerKeyboardControlls = new StateMap();
            
            keyboard.on('output', playerKeyboardControlls.feed(KeyboardInput.keyMap));
            mouse.on('output', playerKeyboardControlls.feed(MouseInput.buttonMap));
            
            playerKeyboardControlls.on('output', function(e) {
                var command = CommandsTranslator(Controlls.movement, e);
                if (command) {
                    gameobjects[network_id].commands.push(command);
                    network.socket.emit('update-object', network_id, gameobjects[network_id].getRepr());
                }
            });
            
            network.socket.on('update-scene', function (objects, delta) {
                for(var x in objects) {
                    if(gameobjects[x] && objects[x] && (parseInt(x) !== parseInt(network_id))) {
                        gameobjects[x].repr(objects[x]);
                    }
                }
            });
            
            network.socket.on('remove', function (object_id) {
                delete gameobjects[object_id];
            });
            
            network.socket.on('player-connected', function (net_id, object) {
                gameobjects[net_id] = new network.classes[object.networkClassName]().repr(object);
            });
            
            network.socket.on('player-leave', function (net_id) {
                delete gameobjects[net_id];
            });
        });
        gameloop.start();
    }
});