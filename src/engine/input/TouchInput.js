(function () {
    define(['engine/EventSet', 'engine/input/Hammer'], function (EventSet, Hammer) {
        function TouchInput(screen, options) {
            if(!options) {
                options = {};
            }
            
            this.screen = screen;
            this.events = new EventSet();
            
            this.hummertime = Hammer(this.screen.canvas);
            
            //Handle the events
            for (var key in TouchInput.eventsMap) {
                if(TouchInput.eventsMap.hasOwnProperty(key)) {
                    this.hummertime.on(key, (function (event) {
                        this.configureEvent(event.gesture, event.type, true, Date.now());
                        this.events.fire('output', event.gesture);
                    }).bind(this));
                }
            }
        }
        
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