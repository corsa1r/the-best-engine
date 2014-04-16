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
    'engine/input/TouchInput'
], function (Container, EventSet, GameLoop, GameObject, StateMap, KeyboardInput, MouseInput, Screen, Camera, TouchInput) {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var screen = new Screen(canvas);
    var touch = new TouchInput(screen);
    
    
    //Draw something with touches
    
    touch.on('output', function(e) {
        if(e.which === 'drag') {
            for(var x in e.touches) {
                context.beginPath();
                context.fillStyle = 'black';
                context.arc(e.touches[x].clientX - 5, e.touches[x].clientY - 5, 10, Math.PI * 2, false);
                context.fill();
            }
        }
    });
});
































