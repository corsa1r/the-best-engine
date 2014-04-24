(function() {
    define(['engine/EventSet'], function(EventSet) {
        function guiGame(gui, gameloop) {
            guiGame.super.constructor.call(this);
            this.Run_Game = false;
            var gui_folder_game = gui.addFolder('Game');
                gui_folder_game.add(this, 'Run_Game');
            
            gameloop.on('update', (function (delta) {
                if(this.Run_Game) {
                    this.fire('update', delta);
                }
            }).bind(this));
        }
        
        guiGame.extend(EventSet);
        

        return guiGame;
    });
})();