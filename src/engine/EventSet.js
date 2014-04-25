(function() {
    define(['src/engine/Container'], function(Container) {

        /**
         * @constructor
         * @returns {undefined}
         */
        function EventSet() {
            EventSet.super.constructor.call(this);
        }

        EventSet.extend(Container);


        /**
         * Attaches event listener to event container. 
         * 
         * @throws {Error} 
         * @param {(string|Object)} name Event name.
         * @param {Function} [listener] Listener to attach.
         * @param {string} [listenerName] Optional name for the listener.
         * @returns {Container} The event container.
         */
        EventSet.prototype.on = function(name, listener, listenerName) {
            var event = this.get(name);
            if (!event)
                event = this.add(new EventSet(), name);
            if (listener) {
                event.add(listener, listenerName);
            }
            return event;
        };


        /**
         * Returns the method .on() bound to given event name.
         * 
         * @param {string} name Event name.
         * @returns {function} Bound .on(name).
         */
        EventSet.prototype.pipe = function(name) {
            return this.on.bind(this, name);
        };


        /**
         * Removes an event listener or a whole event from the set.
         * 
         * @param {(string|number)} name Event object, name or id.
         * @param {(string|number|Function)} [listener] Event listener or it's name or id.
         * @returns {undefined}
         */
        EventSet.prototype.remove = function(name, listener) {
            if (!listener) {
                EventSet.super.remove.call(this, name);
            } else {
                var event = this.get(name);
                if (event)
                    event.remove(listener);
            }
        };


        /**
         * Fires an event.
         * 
         * @param {string} Event name.
         * @param {...*} Arguments to be passed to the listeners.
         * @returns {Array} Array of event listener results.
         */
        EventSet.prototype.fire = function(/* ... */) {
            var _arguments = Array.prototype.slice.call(arguments);
            var name = _arguments.shift();
            var event = this.get(name);
            if (event)
                return event.apply(_arguments);
        };

        return EventSet;
    });
})();