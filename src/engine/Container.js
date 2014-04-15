(function() {
    define(['engine/helpers/ECMAFix'], function() {

        /**
         * A convenient object container.
         * 
         * @constructor
         * @returns {undefined}
         */
        function Container() {
            Container.super.constructor.call(this);
            this.items = [];
            this.names = [];
            this.links = {};
            this.block;
            this.cache;
        }

        Container.extend(Object);


        /**
         * Adds an item to the container.
         * 
         * @param {*} item The item that will be contained. Important: if string is being stored, and no name is passed, the string itself will be used as name.
         * @param {string} name An optional name for the item.
         * @returns {Object} The item.
         */
        Container.prototype.add = function(item, name) {
            var id = this.items.push(item) - 1;
            if (!name && typeof item === "string") {
                name = item;
            }
            if (name) {
                name = String(name);
                this.links[name] = id;
                this.names[id] = name;
            }
            return item;
        };


        /**
         * Return the index of given reference item.
         * 
         * @param {(number|string|Object)} item Item, id or item's name. If id is passed, then will test if it exists.
         * @returns {number} The id of the item and -1 if no such items is found or id an id is out of range.
         */
        Container.prototype.indexOf = function(item) {
            var id;

            if (typeof item === 'number') {
                id = item >= this.items.length ? -1 : item;

            } else if (typeof item === 'string') {
                if (item in this.links) {
                    id = this.links[item];
                } else
                    id = -1;

            } else {
                id = this.items.indexOf(item);
            }

            return id;
        };


        /**
         * Return the name of an item in the container or undefined if it isn't named or found.
         * 
         * @param {(number|Object)} item The items or it's id.
         * @returns {(string|undefined)} The item's name or undefined.
         */
        Container.prototype.nameOf = function(item) {
            var id = this.indexOf(item);
            return this.names[id];
        };


        /**
         * Insert item in the container.
         * 
         * @param {(number|string|Object)} reference Reference item, id or name.
         * @param {Object} item The item that will be inserted.
         * @param {string} name Optional name for the item.
         * @param {boolean} after Pass true to insert after the reference item, or false to insert before the reference object.
         * @returns {(Object|undefined)} The item or undefined if the reference item is not found.
         */
        Container.prototype.insert = function(reference, item, name, after) {
            var id = this.indexOf(reference);

            if (id !== -1) {
                id = after ? id + 1 : id;
                this.items.splice(id, 0, item);
                if (name)
                    this.links[name] = id;
                return item;

            }
        };


        /**
         * Remove item from the container.
         * 
         * @param {(number|string|Object)} item Item, id or name.
         * @returns {undefined}
         */
        Container.prototype.remove = function(item) {
            var id = this.indexOf(item);
            if (id !== -1) {
                delete this.links[this.names[id]];
                delete this.items[id];
                delete this.names[id];
            }
        };


        /**
         * Invokes a method of every item in the container. All arguments after 'method' are passed to the call.
         * 
         * @param {...*} Method name and arguments to pass.
         * @returns {Array} Array of call results.
         */
        Container.prototype.invoke = function(/* method, ... */) {
            var results = new Array(this.items.length);
            var _arguments = Array.prototype.slice.call(arguments);
            var method = _arguments.shift();

            for (var id = 0, length = this.items.length; id < length; id++) {
                if (this.items[id] && typeof this.items[id][method] === 'function') {
                    results[id] = this.items[id][method].apply(this.items[id], _arguments);
                }
            }
            return results;
        };


        /**
         * Calls every item (if it is a function) in the container.
         * 
         * @param {...*} Arguments to pass.
         * @returns {Array} Array of call results.
         */
        Container.prototype.call = function(/* ... */) {
            var results = new Array(this.items.length);
            for (var id = 0, length = this.items.length; id < length; id++) {
                if (typeof this.items[id] === 'function') {
                    results[id] = this.items[id].apply(this.items[id], arguments);
                } else {
                    if (this.items[id] instanceof Container && !this.items[id].block) {
                        this.items[id].block = true;
                        results[id] = this.items[id].apply(arguments);
                        this.items[id].block = false;
                    }
                }
            }
            return results;
        };


        /**
         * Calls every item (if it is a function) in the container with supplied array of arguments.
         * 
         * @param {Array} _arguments Arguments to pass to the function.
         * @returns {Array} Array of call results.
         */
        Container.prototype.apply = function(_arguments) {
            var results = new Array(this.items.length);
            for (var id = 0, length = this.items.length; id < length; id++) {
                if (typeof this.items[id] === 'function') {
                    results[id] = this.items[id].apply(this.items[id], _arguments);
                } else {
                    if (this.items[id] instanceof Container) {
                        this.items[id].block = true;
                        results[id] = this.items[id].apply(_arguments);
                        this.items[id].block = false;
                    }
                }
            }
            return results;
        };


        /**
         * Applies a function(item[, id[, name]]) over every contained item. 
         * 
         * @param {Function} procedure The function to apply. If it returns boolean false the iteration aborts.
         * @returns {boolean} True on success, false on halt.
         */
        Container.prototype.each = function(procedure) {
            for (var id = 0, length = this.items.length; id < length; id++) {
                if (this.items[id]) {
                    if (procedure(this.items[id], id, this.nameOf(id)) === false)
                        return false;
                }
            }
            return true;
        };


        /**
         * Test is the item is inside the container and adds it to the internal cache.
         * It can be retreived with subsequent call to .get() with empty argument.
         * 
         * @param {(number|string)} what Item's id or name.
         * @returns {boolean} True if the item is found, false otherwise.
         */
        Container.prototype.has = function(what) {
            this.cache = this.get(what);
            return Boolean(this.cache);
        };


        /**
         * Returns item from the container by specified id or name or from the cache (see .has()).
         * 
         * @param {(number|string|undefined)} what Items's id or name or 'undefined'.
         * @returns {Object} The item, or undefined if it's not found.
         */
        Container.prototype.get = function(what) {
            if (what === undefined) {
                return this.cache;
            }

            var id = this.indexOf(what);

            if (id !== -1) {
                return this.items[id];
            }
        };


        /**
         * Removes all objects.
         * 
         * @returns {undefined}
         */
        Container.prototype.empty = function() {
            for (var id = 0, length = this.items.length; id < length; id++) {
                this.remove(id);
            }
        };

        return Container;
    });
})();