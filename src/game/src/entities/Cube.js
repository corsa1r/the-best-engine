define(['engine/EventSet', 'engine/GameObject'], function (EventSet, GameObject) {
    
    function Cube(x, y, w, h, c) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        
        this.vx = 0;
        this.vy = 0;
        
        this.ms = 0.1;
        
        this.c = c || '#'+Math.floor(Math.random()*16777215).toString(16);
        this.commands = [];
        
        this.events = new EventSet;
        
        this.events.on('left', this.left.bind(this));
        this.events.on('right', this.right.bind(this));
        this.events.on('up', this.up.bind(this));
        this.events.on('down', this.down.bind(this));
        
        this.networkClassName = Cube.getName();
        
        return this;
    };
    
    Cube.extend(GameObject);
    
    
    Cube.prototype.up = function (state) {
        if(state) {
            this.vy = -this.ms;
        } else {
            this.vy = 0;
        }
        return this;
    };
    
    Cube.prototype.down = function (state) {
        if(state) {
            this.vy = this.ms;
        } else {
            this.vy = 0;
        }
        return this;
    };
    
    Cube.prototype.left = function (state) {
        if(state) {
            this.vx = -this.ms;
        } else {
            this.vx = 0;
        }
        return this;
    };
    
    Cube.prototype.right = function (state) {
        if(state) {
            this.vx = this.ms;
        } else {
            this.vx = 0;
        }
        return this;
    };
    
    Cube.prototype.update = function (delta, cubeTerrain) {
        this.rowCommands();
        
        if(this.x <= cubeTerrain.x) {
            this.x = cubeTerrain.x;
        }
        
        if(this.y <= cubeTerrain.y) {
            this.y = cubeTerrain.y;
        }
        
        if(this.x + this.w >= cubeTerrain.w) {
            this.x = cubeTerrain.w - this.w;
        }
        
        if(this.y + this.h >= cubeTerrain.h) {
            this.y = cubeTerrain.h - this.h;
        }
        
        this.x += (this.vx * delta);
        this.y += (this.vy * delta);
        return this;
    };
    
    Cube.prototype.rowCommands = function () {
        var command = null;
        
        while(command = this.commands.shift()) {
            if(command) {
                this.events.fire(command.name, command.state);
            }
        }
        
        return this;
    };
    
    Cube.prototype.draw = function (context) {
        context.beginPath();
        context.fillStyle = this.c;
        context.rect(this.x|0, this.y|0, this.w, this.h);
        context.fill();
        context.closePath();
        return this;
    };
    
    Cube.prototype.networkDependenciesAsset = ['x', 'y', 'w', 'h', 'vx', 'vy', 'c'];
    
    return Cube;
});