(function () {
    define(function () {
        
        function Cube() {
            this.x = 100;
            this.y = 100;
            this.w = 100;
            this.h = 100;
            
            this.vx = 0;
            this.vy = 0;
            
            return this;
        }
        
        Cube.prototype.update = function (delta) {
            this.x += (this.vx * delta);
            this.y += (this.vy * delta);
            
            if(this.x <= 0) {
                this.x = 0;
            }
            
            if(this.x + this.w >= 1024) {
                this.x = 1024 - this.w;
            }
            
            if(this.y <= 0) {
                this.y = 0;
            }
            
            if(this.y + this.h >= 768) {
                this.y = 768 - this.h;
            }
        };
        
        Cube.prototype.draw = function (context) {
            context.beginPath();
            context.fillStyle = 'black';
            context.rect(this.x, this.y, this.w, this.h);
            context.fill();
        };
        
        Cube.prototype.isPointOnMe = function (x, y, w, h) {
            if(!w) { w = 0; }
            if(!h) { h = 0; }
            
            if(x + w >= this.x && x <= this.x + this.w && y + h >= this.y && y <= this.y + this.h) {
                return true;
            }
            
            return false;
        };
        
        return Cube;
    });
})();