(function() {
    define(['engine/GameObject'], function(GameObject) {
        function Body() {
            Body.super.constructor.call(this);
        };
        
        Body.extend(GameObject);
        

        Body.prototype.defaults = {};

        Body.prototype.fixtureDefaults = {};

        Body.prototype.definitionDefaults = {};
        
        return Body;
    });
})();