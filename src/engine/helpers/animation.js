define(['engine/EventSet'], function(EventSet) {
    
    var Animation = function(asset) {
        this.asset = asset;
        this.time = 0;
        this.current_frame = this.asset.current_frame;
        this.paused = false;
        this.speed = 0;
    };
    
    Animation.extend(EventSet);
    
    
    Animation.prototype.pause = function() {
        this.fire('paused');
        this.paused = true;
        return this;
    };

    Animation.prototype.start = function() {
        this.fire('started');
        this.paused = false;
        return this;
    };

    Animation.prototype.toggle = function() {
        this.fire('toggled');
        this.paused = !this.paused;
        return this;
    };

    Animation.prototype.getFrame = function(stepsPerFrame, loop) {
        if (!this.paused) {
            if (this.time > 1) {
                this.current_frame += 1;
                if (this.current_frame >= this.asset.frames) {
                    this.current_frame = loop ? 1 : this.asset.frames;
                    this.fire('end');
                }

                this.time -= 1;
            }

            this.fire('step', this.current_frame);
            this.time += stepsPerFrame;
        }

        return this.current_frame;
    };
    
    return Animation;
});