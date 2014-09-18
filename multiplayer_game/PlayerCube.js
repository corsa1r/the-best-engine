;(function () {
    
    define(['src/engine/NetworkGameObject'], function (NetworkGameObject) {
        
        var PlayerCube = function (x, y, c) {
            PlayerCube.super.constructor.call(this);
            
            this.networkClassName = "PlayerCube";
            
            this.x = x;
            this.y = y;
            
            this.c = c;
            
            this.o = 3;
            
            this.health = 1000;
            
            this.setNetworkDependenciesAsset(['x', 'y', 'c', 'o', 'health']);
        };
        
        PlayerCube.extend(NetworkGameObject);
        
        PlayerCube.prototype.draw = function (screen, camera) {
            screen.context.beginPath();
            screen.context.fillStyle = this.c;
            
            switch (this.o) {
                case 0 :
                    screen.context.rect(this.x - 10, this.y + 12, 20, 6);
                    break;
                case 1 :
                    screen.context.rect(this.x + 12, this.y - 10, 6, 20);
                    break;
                case 2 :
                    screen.context.rect(this.x + 10 + 12, this.y + 12, 20, 6);
                    break;
                case 3 :
                    screen.context.rect(this.x + 12, this.y + 10 + 12, 6, 20);
                    break;
            }
            
            screen.context.rect(this.x, this.y, 30, 30);
            screen.context.fill();
        };
        
        return PlayerCube;
    });
    
})();