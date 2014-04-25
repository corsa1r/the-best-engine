(function() {
    define(['src/engine/input/StateMap', 'src/engine/input/MouseInput'], function(StateMap, MouseInput) {
        var PlatformCameraController = function (mouse, camera) {
            this.camera = camera;
            this.controllPoint = null;
            this.controllerState = new StateMap();
            mouse.on('output', this.controllerState.feed(MouseInput.buttonMap));
            mouse.on('move', this.move.bind(this));
            this.controllerState.on('output', this.input.bind(this));
        };
        
        PlatformCameraController.prototype.input = function (e) {
            if(e.which === 'RMB' && e.state) {
                this.controllPoint = {
                    x: e.x,
                    y: e.y,
                    ox: this.camera.x,
                    oy: this.camera.y
                };
            }
            
            if(e.which === 'RMB' && !e.state) {
                this.controllPoint = null;
            }
        };
        
        PlatformCameraController.prototype.move = function (e) {
            if(this.controllPoint) {
                this.camera.x = this.controllPoint.ox - (e.x - this.controllPoint.x);
                this.camera.y = this.controllPoint.oy - (e.y - this.controllPoint.y);
            }
        };
        
        return PlatformCameraController;
    });
})();