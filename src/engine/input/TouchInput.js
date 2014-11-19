/**
 * @file implements Touch input
 * @author CORSAIR <vladimir.corsair@gmail.com>
 * @version test
 */

;(function () {
    /**
     * Define module Touch input
     * @param {Object} EventSet
     * @param {Object} Hammer
     * @returns {_L5.TouchInput}
     */
    define([
        'src/engine/EventSet',
        'src/lib/Hammer',
        'src/engine/physics/Vector'
    ], function (EventSet, Hammer, Vector) {

        /**
         * Class Touch input
         * @param {Object} screen - requires Screen
         * @param {Object} options - Hammer.js options
         * @returns {_L14.TouchInput}
         */
        function TouchInput(screen, options) {
            TouchInput.super.constructor.call(this);

            this.screen = screen;

            var defaultOptions = {
                cssProps: {
                    tapHighlightColor: 'rgba(0,255,0,1)'
                }
            };

            this.hammertime = new Hammer(this.screen.canvas, options || defaultOptions);
            
            this.hammertime.on(TouchInput.eventsMap.join(' '), (function(event) {
                
                var eventCenter = new Vector().copy(event.center);
                var translateObject = {};

                translateObject.position = eventCenter;
                if(this.screen.innerPoint(eventCenter)) {
                    var output = {
                        position:   this.screen.translate(translateObject).position,
                        angle:      event.angle,
                        isFirst:    Boolean(event.isFirst),
                        isFinal:    Boolean(event.isFinal),
                        deltaTime:  event.deltaTime,
                        time :      event.timeStamp,
                        state :     !Boolean(event.isFinal),
                        type:       event.type,
                        original:   event
                    };

                    this.fire('output', output);
                }
            }).bind(this));


            this.hammertime.get('pan').set({ direction: Hammer.DIRECTION_ALL });
            this.hammertime.get('swipe').set({ direction: Hammer.DIRECTION_ALL });
        }
        
        TouchInput.extend(EventSet);
        
        TouchInput.eventsMap = ['tap', 'doubletap', 'press', 'swipe', 'pan', 'panstart', 'panend', 'panmove'];
        
        return TouchInput;
    });
})();