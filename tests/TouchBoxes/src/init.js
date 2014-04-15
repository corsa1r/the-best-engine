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
    'engine/input/TouchInput',
    
    
    '../src/Cube'
], function (Container, EventSet, GameLoop, GameObject, StateMap, KeyboardInput, MouseInput, Screen, Camera, TouchInput, Cube) {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var screen = new Screen(canvas);
    var touch = new TouchInput(screen);
    var gameloop = new GameLoop();
    
    var cube = new Cube();
    
    gameloop.on('update', function (delta) {
        cube.update(delta);
    });
    
    gameloop.on('draw', function () {
        context.clearRect(0, 0, screen.canvas.width, screen.canvas.height);
        cube.draw(context);
    });
    
    touch.on('output', function (e) {
        var obj = screen.translate({ x: e.touches[0].clientX, y: e.touches[0].clientY });
        
        if(e.which === 'drag') {
            if(cube.isPointOnMe(obj.x, obj.y)) {
                cube.x = obj.x - cube.w / 2;
                cube.y = obj.y - cube.h / 2;
            }
        }
        
        if(e.which === 'dragend') {
            cube.vx = e.direction === 'left' ? -e.velocityX : e.velocityX;
            cube.vy = e.direction === 'up' ? -e.velocityY : e.velocityY;
        }
        
        if(e.which === 'tap') {
            if(cube.isPointOnMe(obj.x, obj.y)) {
                cube.vx = 0;
                cube.vy = 0;
            }
        }
    });
    
    gameloop.start();
});
































