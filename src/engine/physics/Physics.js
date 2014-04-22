(function() {
    define(['engine/EventSet'], function(EventSet) {
        var Physics = function() {
            Physics.super.constructor.call(this);
        };

        Physics.extend(EventSet);



        Physics.prototype.step = function() {
            throw new Error('This is abstract method');
        };

        Physics.vector2         = {};
        Physics.bodyDef         = {};
        Physics.body            = {};
        Physics.fixtureDef      = {};
        Physics.fixture         = {};
        Physics.world           = {};
        Physics.massData        = {};
        Physics.polygonShape    = {};
        Physics.circleShape     = {};
        Physics.debugDraw       = {};
        
        return Physics;
    });
})();