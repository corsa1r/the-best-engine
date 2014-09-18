(function() {
    define(function() {
        Object.defineProperty(Object, 'combine', {value: function(object) {
                if (object instanceof Object) {
                    for (var id in object) {
                        if (object.hasOwnProperty(id)) {
                            if (this[id] instanceof Object) {
                                this[id].combine(object[id]);
                            } else {
                                this[id] = object[id];
                            }
                        }
                    }
                }
            }});
    });
})();