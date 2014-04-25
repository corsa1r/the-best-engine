(function() {
    define([], function() {
        function PlatformLoopObjects(platformLoop, objects, physics, screen) {
            platformLoop.on('update', function (delta) {
                objects.each(function (object) {
                    object.update(delta);
                });
                
                physics.step(delta);
            });
            
            platformLoop.on('draw', function () {
                if(!physics.debugDraw) {
                    screen.context.clearRect(0, 0, screen.canvas.width, screen.canvas.height);
                }
                objects.each(function (object) {
                    object.draw(screen.context);
                });
            });
        }
        
        
        return PlatformLoopObjects;
    });
})();