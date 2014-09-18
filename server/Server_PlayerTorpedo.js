;(function () {
    
    var PlayerTorpedo = function (x, y, o, owner_id) {
        this.networkClassName = "PlayerTorpedo";
        
        this.owner_id = owner_id;
        
        this.x = x;
        this.y = y;
        this.o = o;
        
        this.v = 1;
    };
    
    PlayerTorpedo.prototype.update = function (delta, gameObjects) {
        switch (this.o) {
            case 0 : 
                this.x -= 1 * delta + this.v;
                break;
            case 2 :
                this.x += 1 * delta + this.v;
                break;
            case 1 :
                this.y -= 1 * delta + this.v;
                break;
            case 3 :
                this.y += 1 * delta + this.v;
                break;
        }
        
        this.v += 0.5;
        
        for(var x in gameObjects) {
            if (gameObjects[x].networkClassName === "PlayerCube" || x !== this.owner_id) {
                
                //Check collision with other's players
                
            }
        }
    };
    
    module.exports = PlayerTorpedo;
    
})();