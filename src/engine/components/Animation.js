;(function() {
    
    define([
        'src/engine/GameObjectComponent'
        ], function (GameObjectComponent) {
        
        var AnimationComponent = function (imageName, options, scene) {
            AnimationComponent.super.constructor.call(this);
            
            this.scene = scene;
        };
        
        AnimationComponent.extend(GameObjectComponent);
        
        AnimationComponent.prototype.update = function (delta, scene) {
            if(this.paused) {
                return false;
            }
            
            if(this.currentUpdate < this.speed) {
                this.currentUpdate++;
            } else {
                this.currentUpdate = 0;
                this.currentFrame++;
                
                if(this.currentFrame > this.frames) {
                    this.currentFrame = this.loop ? 1 : this.frames;
                }
            }
        };
        
        AnimationComponent.prototype.draw = function (screen, camera) {
            screen.context.save();
            screen.context.beginPath();
            screen.context.drawImage(
                this.image,                                     //Draw image
                this.currentFrame * this.frameWidth,            //Offset left
                0,                                              //Offset top
                this.frameWidth,                                //Width of clipped area
                this.gameObject.size.y,                         //Height of clipped area
                this.gameObject.position.x - camera.position.x, //Context position x with camera
                this.gameObject.position.y - camera.position.y, //Context position y with camera
                this.gameObject.size.x,                         //Drawed width
                this.gameObject.size.y                          //Drawed height
                );
            screen.context.restore();
        };
        
        AnimationComponent.prototype.setupAsset = function (imageName, options) {
            options = options || {};
            this.currentUpdate = 0;
            this.currentFrame = 1;
            this.frames = options.frames || 1;
            this.image = this.scene.resources.folders.get('images').files.get(imageName).getResource();
            this.frameWidth = this.image.width / this.frames;
            this.speed = options.speed || 100;
        }
        
        AnimationComponent.prototype.play = function (name, options) {
            this.setupAsset(name, options);
            this.resume();
        };
        
        AnimationComponent.prototype.pause = function () {
            this.paused = true;
        };
        
        AnimationComponent.prototype.toggle = function () {
            this.paused = !this.paused;
        };
        
        AnimationComponent.prototype.resume = function () {
            this.paused = false;
        };
        
        AnimationComponent.prototype.stop = function () {
            this.pause();
            this.currentFrame = 1;
        };
        
        return AnimationComponent;
    });
    
})();