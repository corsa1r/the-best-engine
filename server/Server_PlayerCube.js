
var PlayerTorpedo = require('./Server_PlayerTorpedo');

var PlayerCube = function(x, y, c) {
    this.networkClassName = "PlayerCube";

    this.x = x;
    this.y = y;

    this.c = c;
    
    this.commands = [];
    
    this.movement = {};
};

PlayerCube.prototype.update = function(delta, gameObjects) {
    this.runCommand(this.commands.shift(), delta, gameObjects);
    
    if(this.movement.left) {
        this.x -= 3 * delta;
    }
    
    if(this.movement.right) {
        this.x += 3 * delta;
    }
    
    if(this.movement.up) {
        this.y -= 3 * delta;
    }
    
    if(this.movement.down) {
        this.y += 3 * delta;
    }
    
    
};

PlayerCube.prototype.runCommand = function (command, delta, gameObjects) {
    if(!command) {
        return;
    }
    
    switch (command.cmd) {
        case 'LEFT' :
            this.movement.left = command.state;
            this.o = 0;
            break;
        case 'RIGHT' :
            this.movement.right = command.state;
            this.o = 2;
            break;
        case 'UP' :
            this.movement.up = command.state;
            this.o = 1;
            break;
        case 'DOWN' :
            this.movement.down = command.state;
            this.o = 3;
            break;
        case 'FIRE' :
            if(!command.state) {
                var start_x = 0;
                var start_y = 0;
                
                switch (this.o) {
                    case 0 : {
                        start_x = this.x - 48 - 12.5;
                        start_y = this.y - 7;
                        break;
                    }
                    case 1 : {
                        start_x = this.x - 48 - 12.5;
                        start_y = this.y + 15 - 14;
                        break;
                    }
                    case 2 : {
                        start_x = this.x - 48 - 12.5;
                        start_y = this.y + 15 - 14;
                        break;
                    }
                    case 3 : {
                        start_x = this.x - 48 - 12.5;
                        start_y = this.y + 15 - 14;
                        break;
                    }
                }
                
                var torpedo = new PlayerTorpedo(start_x, start_y, this.o, gameObjects.indexOf(this));
                var id = gameObjects.push(torpedo);

                setTimeout(function () {
                    gameObjects[id - 1].deleted = true;
                }, 2000);
            }
            break;
    }
};

PlayerCube.prototype.repr = function(repr) {
    for (var x in repr) {
        this[x] = repr[x];
    }

    return this;
};

module.exports = PlayerCube;