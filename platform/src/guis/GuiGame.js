(function() {
    define([], function() {
        function GuiPhysics(gui, platformLoopController) {
            var folder = gui.addFolder('Game');
                folder.add(platformLoopController, 'pausedUpdates');
                
            folder.open();
        };
        
        return GuiPhysics;
    });
})();