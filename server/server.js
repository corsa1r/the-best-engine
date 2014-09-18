;
(function() {

    "use strict";

    var app = require('express')();
    var server = require('http').Server(app);
    var io = require('socket.io')(server);
    
    var PlayerCube = require('./Server_PlayerCube');
    
    var networkClassed = {
        'PlayerCube' : PlayerCube
    };
    
    server.listen(8080);
    
    var gameObjects = [];
    
    var serverBot = new PlayerCube(130, 130, 'red');
    
    var cmdCurrent = 0;
    var cmdPrev = 0;
    
    var cmds = ['RIGHT', 'DOWN', 'LEFT', 'UP'];
    
    setInterval(function () {
        
        serverBot.commands.push({
            cmd : cmds[cmdCurrent],
            state: true
        });
        
        if(cmdCurrent !== cmdPrev) {
            serverBot.commands.push({
                cmd : cmds[cmdPrev],
                state: false
            });
        }
        
        if(cmdCurrent < cmds.length) {
            cmdCurrent++;
            cmdPrev = cmdCurrent - 1;
        } else {
            cmdCurrent = 0;
            cmdPrev = cmds.length - 1;
        }
        
        setTimeout(function () {
            serverBot.commands.push({
                cmd: 'FIRE',
                state: false
            });
        }, Math.random() * 500);
    }, 400);
    
    gameObjects.push(serverBot);
    
    var world = 'World of multiplayer';
    
    var time = Date.now();
    
    setInterval(function () {
        var now = Date.now();
        var delta = (now - time) / 10;
        time = now;
        
        var deleted = [];
        
        for(var x in gameObjects) {
            if(gameObjects[x]) {
                if(gameObjects[x].deleted) {
                    deleted.push(x);
                    delete gameObjects[x];
                } else {
                    gameObjects[x].update(delta, gameObjects);
                }
            }
        }
        
        io.to(world).emit('update-scene', gameObjects, deleted);
    }, 1000 / 30);
    
    io.on('connection', function(socket) {
        
        socket.emit('scene.init', gameObjects);
        
        socket.on('scene.init.ready', function () {
            socket.leave(world);
            socket.join(world);
        });
        
        socket.on('new.player', function (player) {
            var id = gameObjects.push(new networkClassed[player.networkClassName]().repr(player));
            socket.emit('player.id', id - 1);
            socket.user_id = id - 1;
        });
        
        socket.on('cmd', function (id, commandName, state) {
            if(gameObjects[id]) {
                if(gameObjects[id].commands) {
                    gameObjects[id].commands.push({
                        cmd: commandName,
                        state: state
                    });
                }
            }
        });
        
        socket.on('disconnect', function () {
            io.to(world).emit('remove-object', socket.user_id);
            delete gameObjects[socket.user_id];
        });
        
    });
})();