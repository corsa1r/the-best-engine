;
(function () {

    "use strict";
    
    define([
        'src/engine/Scene',
        'src/engine/network/SocketNetwork',
        'multiplayer_game/PlayerCube',
        'multiplayer_game/PlayerTorpedo',
        'src/engine/input/StateMap',
        'src/engine/input/KeyboardInput'
    ], function(Scene, SocketNetwork, PlayerCube, PlayerTorpedo, StateMap, KeyboardInput) {
        
        var scene = new Scene(document.getElementById('canvas'), 800, 400);
        var network = new SocketNetwork();
        
        network.register('PlayerCube', PlayerCube);
        network.register('PlayerTorpedo', PlayerTorpedo);
        
        scene.init().then(function () {
            
            var playerId = null;
            var player = new PlayerCube(50, 50, '#'+Math.floor(Math.random()*16777215).toString(16));
            
            network.connect('http://192.168.0.101:8080');
            
            network.socket.on('connect', function () {
                console.log('NETWORK.CONNECTED');
            });
            
            network.socket.on('disconnect', function () {
                console.warn('NETWORK.DISCONNECTED');
                scene.objects.empty();
            });
            
            network.socket.on('error', function () {
                console.error('NETWORK.ERROR');
                scene.objects.empty();
            });
            
            network.socket.on('scene.init', function (objects) {
                
                console.log('SCENE.INIT');
                
                for(var i in objects) {
                    if(objects[i]) {
                        var object = new network.classes[objects[i].networkClassName]();

                        object.repr(objects[i]);

                        scene.objects.add(object, i);
                    }
                }
                
                scene.gameLoop.start();
                network.socket.emit('scene.init.ready');
                network.socket.emit('new.player', player.getRepr());
            });
            
            network.socket.on('update-scene', function (objects, deleted) {
                for(var x in deleted) {
                    scene.objects.remove(deleted[x]);
                }
                
                for(var i in objects) {
                    if(scene.objects.has(i)) {
                        scene.objects.get(i).repr(objects[i]);
                    } else {
                        if(objects[i]) {
                            var object = new network.classes[objects[i].networkClassName]();

                            object.repr(objects[i]);

                            scene.objects.add(object, i);
                        }
                    }
                }
            });
            
            network.socket.on('player.id', function (myId) {
                playerId = myId;
                scene.objects.add(player, myId);
                
                
                var keyboard = new KeyboardInput();
                var playerControlls = new StateMap();
                
                keyboard.on('output', playerControlls.feed(KeyboardInput.keyMap));
                playerControlls.on('output', function (event) {
                    switch (event.which) {
                        case 'A' :
                            network.socket.emit('cmd', myId, 'LEFT', event.state);
                            break;
                        case 'D' :
                            network.socket.emit('cmd', myId, 'RIGHT', event.state);
                            break;
                        case 'W' :
                            network.socket.emit('cmd', myId, 'UP', event.state);
                            break;
                        case 'S' :
                            network.socket.emit('cmd', myId, 'DOWN', event.state);
                            break;
                        case 'I' :
                            network.socket.emit('cmd', myId, 'FIRE', event.state);
                            break;

                    }
                });
                    network.socket.emit('cmd', myId, 'RIGHT');
                
            });
            
            network.socket.on('remove-object', function (id) {
                console.log('REMOVE', id);
                scene.objects.remove(id);
            });
        });
    });
    
})();