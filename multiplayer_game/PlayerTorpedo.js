;(function () {
    
    define(['src/engine/NetworkGameObject'], function (NetworkGameObject) {
        
        var PlayerTorpedo = function () {
            PlayerTorpedo.super.constructor.call(this);
            
            this.networkClassName = "PlayerTorpedo";
            
            this.setNetworkDependenciesAsset(['x', 'y', 'o']);
        };
        
        PlayerTorpedo.extend(NetworkGameObject);
        
        PlayerTorpedo.prototype.update = function () {
            if(!this.image) {
                this.image = this.resources.folders.get('images').files.get('rocket').resource;
            }
            
            switch (this.o) {
                case 0:
                    this.a = 270;
                    break;
                case 1:
                    this.a = 0;
                    break;
                case 2:
                    this.a = 90;
                    break;
                case 3: 
                    this.a = 180;
                    break
            }
        };
        
        PlayerTorpedo.prototype.draw = function (screen) {
            screen.context.beginPath();
            screen.context.save();
            screen.context.translate(this.x + 14, this.y + 24);
            screen.context.rotate(Math.PI / 180 * this.a);
            screen.context.drawImage(this.image, -14, -24, 28, 48);
            screen.context.restore();
        };
        
        return PlayerTorpedo;
    });
    
})();