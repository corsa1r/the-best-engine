(function() {
    define(function() {
        /**
         * @file implements Screen
         * @author CORSAIR <vladimir.corsair@gmail.com>
         * @version 2.1.4
         */

        /**
         * Initialize screen
         * @param {Object} canvas the html element canvas
         * @returns {Screen}
         */
        var Screen = function(canvas) {
            this.canvas = canvas;
            this.context = this.canvas.getContext('2d');

            //prevent browser context menu
            this.canvas.oncontextmenu = function() {
                return false;
            };

            this.canvas.addEventListener('resize', this.resize.bind(this));
            this.resize();
            this.setCanvasSize(1024, 768);
            return this;
        };

        /**
         * Translate x, y to the canvas coordinates
         * @param {Object} obj holds x and y mouse position
         * @returns {Screen.prototype.translate.obj}
         */
        Screen.prototype.translate = function(obj) {
            obj.x = (obj.x - this.borderLeft - this.boundingRect.left) * this.scaleX;
            obj.y = (obj.y - this.borderTop - this.boundingRect.top) * this.scaleY;
            return obj;
        };

        /**
         * Resize borders and scales on window resize
         * @returns {undefined}
         */
        Screen.prototype.resize = function() {
            this.boundingRect = this.canvas.getBoundingClientRect();
            this.borderLeft = (this.canvas.offsetWidth - this.canvas.clientWidth) >> 1;
            this.borderTop = (this.canvas.offsetHeight - this.canvas.clientHeight) >> 1;
            this.scaleX = this.canvas.width / (this.canvas.offsetWidth - (this.borderLeft << 1));
            this.scaleY = this.canvas.height / (this.canvas.offsetHeight - (this.borderTop << 1));
        };

        /**
         * Check if coordinates xy are in the rectangle
         * @param {type} x mouse x
         * @param {type} y mouse y
         * @returns {Boolean}
         */
        Screen.prototype.innerPoint = function(x, y) {
            if (x >= 0 && y >= 0 && x < this.canvas.offsetWidth - (this.borderLeft << 1) &&
                    y < this.canvas.offsetHeight - (this.borderTop << 1)) {
                return true;
            }
        };


        Screen.prototype.setCanvasSize = function(width, height, aspectRatio) {
            if (aspectRatio === undefined)
                aspectRatio =
                        this.canvas.offsetWidth / this.canvas.offsetHeight;
            if (width === undefined)
                width = aspectRatio * height;
            if (height === undefined)
                height = width / aspectRatio;
            this.canvas.width = width;
            this.canvas.height = height;
            this.scaleX = this.canvas.width / (this.canvas.offsetWidth - (this.borderLeft << 1));
            this.scaleY = this.canvas.height / (this.canvas.offsetHeight - (this.borderTop << 1));
        };

        return Screen;
    });
})();