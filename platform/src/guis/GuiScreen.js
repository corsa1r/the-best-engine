(function() {
    define([], function() {
        function GuiScreen(gui, screen) {            
            var folder = gui.addFolder('Screen / Canvas');
            folder.add(screen.canvas, 'width');
            folder.add(screen.canvas, 'height');
            folder.close();
        };
        
        return GuiScreen;
    });
})();