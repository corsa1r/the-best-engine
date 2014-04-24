(function() {
    define([], function() {
        function guiCamera(gui, camera) {
            //Add folder Camera
            var gui_folder_camera = gui.addFolder('Camera');
            //Camera position.x
            gui_folder_camera.add(camera, 'x').listen();
            //Camera.position.y
            gui_folder_camera.add(camera, 'y').listen();
            //Viewport width
            gui_folder_camera.add(camera.screen.canvas, 'width');
            //Viewport height
            gui_folder_camera.add(camera.screen.canvas, 'height');

            gui.remember(camera);
        }

        return guiCamera;
    });
})();