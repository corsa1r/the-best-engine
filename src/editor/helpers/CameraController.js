;(function() {
    define([], function() {

        var CameraController = function (scene, inputRouter) {
            this.camera = scene.camera;

            this.controllPoint = null;

            inputRouter.editor.mouse.on('move', this.move.bind(this));
            inputRouter.editor.mouse.on('output', this.input.bind(this));
        };
        
        CameraController.prototype.input = function (e) {
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
        
        CameraController.prototype.move = function (e) {
            if(this.controllPoint) {
                this.camera.x = this.controllPoint.ox - (e.x - this.controllPoint.x);
                this.camera.y = this.controllPoint.oy - (e.y - this.controllPoint.y);
            }
        };
        
        return CameraController;
    });
})();