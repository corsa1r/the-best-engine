/**
 * @file implements function to controll scene camera
 * @author CORSAIR <vladimir.corsair@gmail.com>
 * @version 1
 */
(function() {
    define(['engine/input/StateMap', 'engine/input/MouseInput'], function(StateMap, MouseInput) {
        
        function CreateCameraControlls (mouse, camera) {
            
            this.controllPoint = null;
            
            this.controlls = new StateMap();
            mouse.on('output', this.controlls.feed(MouseInput.buttonMap));

            this.controlls.on('output', (function (e) {
                /**
                 * Set the controll point
                 */
                if(e.which === 'MMB' && e.state) {
                    this.controllPoint = {x: e.x, y: e.y, ox: camera.x, oy: camera.y};
                }
                /**
                 * Remove the controll point
                 */
                if(e.which === 'MMB' && !e.state) {
                    this.controllPoint = null;
                }
            }).bind(this));
            
            /**
             * @param {Object} e mouse move command
             */
            mouse.on('move', (function (e) {
                if(this.controllPoint) {
                    camera.x = (this.controllPoint.ox + this.controllPoint.x - e.x);
                    camera.y = (this.controllPoint.oy + this.controllPoint.y - e.y);
                }
            }).bind(this));
        }
        
        return CreateCameraControlls;
    });
})();