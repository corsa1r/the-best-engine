(function () {
    define(['engine/GameObject'], function (GameObject) {
        
        function Player() {
            Player.super.constructor.call(this);
        }
        
        Player.extend(GameObject);
        
        
        Player.prototype.update = function (delta) {
            
        };
        
        Player.prototype.render = function (context) {
            
        };
        
        return Player;
    });
})();