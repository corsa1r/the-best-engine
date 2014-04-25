(function() {
    define(['src/engine/EventSet'], function(EventSet) {
        function PlatformLoop(gameloop) {
            PlatformLoop.super.constructor.call(this);
            this.pausedUpdates = true;
            
            gameloop.on('loop', this.loop.bind(this));
        }
        
        PlatformLoop.extend(EventSet);
        
        
        PlatformLoop.prototype.loop = function (delta) {
            this.fire('draw', delta);
            if(!this.pausedUpdates) {
                this.fire('update', delta);
            }
        };
        
        return PlatformLoop;
    });
})();