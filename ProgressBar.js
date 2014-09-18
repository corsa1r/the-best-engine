;
(function() {

    "use strict";

    define(['src/engine/GameObject'], function(GameObject) {

        var ProgressBar = function() {
            ProgressBar.super.constructor.call(this);

            this.position = {x: 0, y: 99};
            this.size = {x: 0, y: 2};
            this.maxSize = {x: 400, y: null};

            this.percents = 0;
            this.targetSizeX = this.size.x;
            this.velocityX = 0.1;
            this.currentFilePath = "";
        };

        ProgressBar.extend(GameObject);

        ProgressBar.prototype.update = function(delta, scene) {

            this.targetSizeX = (this.maxSize.x / 100) * this.percents;

            if (this.size.x < this.targetSizeX) {
                this.size.x += this.velocityX;
                this.velocityX += 0.2 * delta;
            } else {
                this.velocityX = 0;
            }

            if (this.size.x >= this.maxSize.x) {
                this.invisible = true;
                this.fire('completed');
                scene.objects.remove(this);
            }
        };

        ProgressBar.prototype.draw = function(screen) {
            if (this.invisible) {
                return;
            }

            this.maxSize.x = screen.canvas.width;

            screen.context.beginPath();
            screen.context.rect(this.position.x, (screen.canvas.height / 2) - this.size.y / 2, this.size.x, this.size.y);
            screen.context.font = "12px verdana";
            screen.context.fillText("Loading: " + (100 * this.size.x / this.maxSize.x).toFixed(0) + "%", 30, screen.canvas.height / 2 - 10);
            screen.context.fillStyle = "red";
            screen.context.fill();
            screen.context.closePath();
        };

        return ProgressBar;
    });

})();