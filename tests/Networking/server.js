var io = require('socket.io').listen(10888);

var gameobjects = [];

var game = 'scene';

io.sockets.on('connection', function(socket) {

    socket.join(game);

    socket.on('login', function(player) {
        gameobjects.push(player);
        var network_id = gameobjects.length - 1;
        socket.network_id = network_id;
        socket.emit('logged', socket.network_id, gameobjects);
        socket.broadcast.to(game).emit('player-connected', socket.network_id, gameobjects[socket.network_id]);
    });

    socket.on('register', function(object) {
        gameobjects.push(object);
    });
    
    socket.on('remove', function (object_id) {
        delete gameobjects[object_id];
        io.sockets.emit('remove', object_id);
    });

    socket.on('update-object', function(net_id, object_repr) {
        gameobjects[net_id] = object_repr;
        var arr = [];
        arr[net_id] = gameobjects[net_id];
        io.sockets.emit('update-scene', arr, 0);
    });

    socket.on('disconnect', function() {
        io.sockets.emit('player-leave', socket.network_id);
        delete gameobjects[socket.network_id];
    });
});