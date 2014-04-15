(function() {
    define(['engine/EventSet'], function(EventSet) {

        /**
         * @file Implements StateMap.
         * @author Zmei Zelen <zmei.zelen@gmail.com>
         * @version 2013.12.18
         */


        function StateMap() {
            StateMap.super.constructor.call(this);
            this.enabled = true;
            this.states = {};
        }

        StateMap.extend(EventSet);


        StateMap.prototype.feed = function(map) {
            return (function(command) {
                if (!this.enabled)
                    return;

                var which = command.which;  // Saves the value of 'which'.

                if (map !== undefined)      // Filters 'which' according to the 'map'.
                    command.which = map[command.which];

                if (command.which !== undefined)
                    this.process(command);

                command.which = which;      // Restores the original value of 'which'.

            }).bind(this);
        };


        StateMap.prototype.isset = function(command) {
            if (typeof command !== 'object') {
                return this.states[command];
            } else {
                return this.states[command.which];
            }
        };


        StateMap.prototype.process = function(command) {
            if (Boolean(this.states[command.which]) !== command.state) {
                this.states[command.which] = command.state;
                this.fire('output', command);
            }
        };


        StateMap.prototype.set = function(which) {
            this.process({which: which, state: true, time: Date.now()});
        };


        StateMap.prototype.clear = function(which) {
            this.process({which: which, state: false, time: Date.now()});
        };


        StateMap.prototype.enable = function() {
            this.enabled = true;
        };



        StateMap.prototype.disable = function(hard) {
            this.enabled = false;
            if (hard) {
                this.states = {};
            } else {
                for (var which in this.states) {
                    this.clear(which);
                }
            }
        };

        return StateMap;
    });
})();