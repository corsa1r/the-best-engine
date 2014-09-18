;(function() {

    define(['src/engine/EventSet', 'src/engine/Container', 'src/engine/Observer'], function(EventSet, Container, Observer) {

        var Subject = function() {
            Subject.super.constructor.call(this);

            this.observers = new Container();
        };
        
        Subject.extend(EventSet);

        Subject.prototype.subscribe = function(observer, name) {
            if(observer instanceof Observer) {
                this.observers.add(observer, name);

                observer.on('notify', (function(observerState, stateStart) {
                    this.fire('changes', observerState, stateStart);
                }).bind(this));
            }
        };

        Subject.prototype.unsubscribe = function(observer) {
            this.observers.remove(observer);
            return this;
        };

        return Subject;
    });
})();