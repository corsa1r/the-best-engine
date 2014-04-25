/**
 * @file implements Touch input
 * @author CORSAIR <vladimir.corsair@gmail.com>
 * @version test
 */

(function () {
    /**
     * Define module Touch input
     * @param {Object} EventSet
     * @param {Object} Hammer
     * @returns {_L5.TouchInput}
     */
    define(['src/engine/EventSet', 'src/lib/Hammer'], function (EventSet, Hammer) {
        
        /**
         * Class Touch input
         * @param {Object} screen - requires Screen
         * @param {Object} options - Hammer.js options
         * @returns {_L14.TouchInput}
         */
        function TouchInput(screen, options) {
            EventSet.super.constructor.call(this);
            this.screen = screen;
            this.hummertime = Hammer(this.screen.canvas, options || {});
            
            //Handle the events from TouchInput.eventsMap
            for (var key in TouchInput.eventsMap) {
                if(TouchInput.eventsMap.hasOwnProperty(key)) {
                    this.hummertime.on(key, (function (event) {
                        this.configureEvent(event.gesture, event.type, true, Date.now());
                        this.fire('output', event.gesture);
                    }).bind(this));
                }
            }
            
            return this;
        }
        
        TouchInput.extend(EventSet);// inherit
        
        TouchInput.prototype.configureEvent = function (event, which, state, time) {
            event.which = which;
            event.state = state;
            event.time = time;
        };
        
        TouchInput.eventsMap = {
            hold:           'hold',
            tap:            'tab',
            doubletap:      'doubletap',
            drag:           'drag',
            dragstart:      'dragstart',
            dragend:        'dragend',
            dragup:         'dragup', 
            dragdown:       'dragdown', 
            dragleft:       'dragleft', 
            dragright:      'dragright',
            swipe:          'swipe', 
            swipeup:        'swipeup', 
            swipedown:      'swipedown', 
            swipeleft:      'swipeleft', 
            swiperight:     'swiperight',
            transform:      'transform', 
            transformstart: 'transformstart', 
            transformend:   'transformend',
            rotate:         'rotate',
            pinch:          'pinch', 
            pinchin:        'pinchin', 
            pinchout:       'pinchout',
            touch:          'touch',
            release:        'release'
        };
        
        return TouchInput;
    });
})();