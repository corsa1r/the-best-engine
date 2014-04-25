(function() {
    define([], function() {
        function GuiCamera(gui, camera) {            
            var folder = gui.addFolder('Camera');
            folder.add(camera, 'x').listen();
            folder.add(camera, 'y').listen();
            
            folder.open();
        };        
        
        return GuiCamera;
    });
})();