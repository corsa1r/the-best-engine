(function() {
    define(['engine/EventSet'], function(EventSet) {

        var Network = function() {
            this.classes = [];
        };

        Network.extend(EventSet);


        Network.prototype.register = function(className, classRefference) {
            this.classes[className] = classRefference;
        };

        return Network;
    });
})();