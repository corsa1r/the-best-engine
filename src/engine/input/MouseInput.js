(function() {
    define(['src/engine/EventSet'], function(EventSet) {

        /**
         * @file implements MouseInput
         * @author CORSAIR <vladimir.corsair@gmail.com>
         * @author Zmei Zelen <zmei.zelen@gmail.com>
         * @version 2013.12.18
         */


        /** 
         * MouseInput.
         * 
         * @constructor
         * @param {Object} screen Instance of a Screen. 
         */
        function MouseInput(screen) {
            MouseInput.super.constructor.call(this);
            this.screen = screen;

            window.addEventListener('mouseup', this.fire.bind(this, 'output', false));
            // TODO: Canvas independent event handlilng.
            screen.canvas.addEventListener('mousedown', this.fire.bind(this, 'output', true));
            screen.canvas.addEventListener('mousemove', this.fire.bind(this, 'move', true));
        }

        MouseInput.extend(EventSet);


        /**
         * Fires the events. For internal use.
         * 
         * @param {String} name The name of the fired event.
         * @param {boolean} state The state of the device input (pressed or released).
         * @param {Object} event The native event object.
         * @returns {Array} Array of listener results.
         */
        MouseInput.prototype.fire = function(name, state, event) {
            var command = this.screen.translate({
                which: event.button !== undefined ? event.button : event.which,
                state: state,
                time: Date.now(),
                x: event.clientX,
                y: event.clientY
            });

            // Won't fire the event if the state is 'pressed' and the pointer is outside
            // the area of interest. However it should fire the an 'release' event 
            // regardless of the pointer position to avoid a pressed state locking.
            if (!state || this.screen.innerPoint(command.x, command.y)) {
                return MouseInput.super.fire.call(this, name, command);
            }

        };


        /**
         * List of mouse button codes.
         * 
         * @static
         * @type Object
         */
        MouseInput.buttonMap = {
            0: 'LMB',
            1: 'MMB',
            2: 'RMB'
        };

        return MouseInput;
    });
})();