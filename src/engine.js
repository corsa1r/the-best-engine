(function(){
    "use strict";

    define(['engine/GameLoop'], function(GameLoop) {
        var loop = new GameLoop();

        // Do stuff here...

        return {
            'loop': loop,
            'foo': 'bar'
        };
    });
}());
