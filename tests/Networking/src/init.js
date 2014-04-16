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
    
    //Define camera/screen classes
    'engine/Screen',
    'engine/Camera',
    
    'engine/network/SocketNetwork'
], function(Container, EventSet, GameLoop, GameObject, StateMap, KeyboardInput, Screen, Camera, SocketNetwork) {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');
    var screen = new Screen(canvas);
    var keyboard = new KeyboardInput();
    
});
































