(function() {
    define([], function() {
        function GuiPhysics(gui, physics) {
            var folder = gui.addFolder('Physics');
            var gravity_folder = folder.addFolder('Gravity');
                gravity_folder.add(physics.world.m_gravity, 'x', -100, 100);
                gravity_folder.add(physics.world.m_gravity, 'y', -100, 100);
                gravity_folder.open();
                
            folder.open();
        };
        
        return GuiPhysics;
    });
})();