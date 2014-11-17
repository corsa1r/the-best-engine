;(function() {

    define([
        'src/engine/EventSet',
        'src/engine/Subject',
        'src/engine/Container',
        'src/engine/helpers/AdvancedContainer',
        'src/engine/physics/Vector'
    ], function(EventSet, Subject, Container, AdvancedContainer, Vector) {

        var GameObject = function() {
            GameObject.super.constructor.call(this);
            
            this.position = new Vector();
            this.size = new Vector();
            
            this.states = new Container();
            this.subject = new Subject(this);

            this.subject.on('changes', (function(newState, starting) {
                this.states[starting ? 'add' : 'remove'](newState);
            }).bind(this));

            this.components = new AdvancedContainer();

            this.components.setAdvancedOnAdd('init', 'init', this);
            this.components.setAdvancedOnRemove('destroy', 'destroy', this);
        };
        
        GameObject.extend(EventSet);

        /**
        * Abstract methods
        */
        GameObject.prototype.init = function () {};
        GameObject.prototype.update = function () {};
        GameObject.prototype.draw = function () {};
        GameObject.prototype.destroy = function () {};

        return GameObject;
    });
})();