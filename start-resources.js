;
(function() {

    "use strict";

    define([
        'src/engine/helpers/resources/ResourceFolder',
        'src/engine/helpers/resources/ResourceImage',
        'src/engine/helpers/resources/ResourceSound',
        'src/engine/Scene',
        'ProgressBar'
    ], function(ResourceFolder, ResourceImage, ResourceSound, Scene, ProgressBar) {
        var scene = new Scene(document.getElementById('canvas'), window.innerWidth, window.innerHeight - 4);
        var progressBar = new ProgressBar();

        var $images1 = new ResourceFolder();
        var $images2 = new ResourceFolder();
        var $images3 = new ResourceFolder();
        var $images4 = new ResourceFolder();
        var $images5 = new ResourceFolder();
        var $sounds = new ResourceFolder();

        $images1.files.add(new ResourceImage('img/1.jpg'));
        $images1.files.add(new ResourceImage('img/10.jpg'));
        $images1.files.add(new ResourceImage('img/11.jpg'));

        $images2.files.add(new ResourceImage('img/2.jpg'));
        $images2.files.add(new ResourceImage('img/8.jpg'));
        $images2.files.add(new ResourceImage('img/9.jpg'));


        $images3.files.add(new ResourceImage('img/3.JPG'));
        $images4.files.add(new ResourceImage('img/4.jpg'));

        $images5.files.add(new ResourceImage('img/5.jpg'));
        $images5.files.add(new ResourceImage('img/6.jpg'));
        $images5.files.add(new ResourceImage('img/7.jpg'));

        $sounds.files.add(new ResourceSound('sounds/horse_walking.wav'));
        $sounds.files.add(new ResourceSound('sounds/horse_walking2.wav'));

        scene.resources.folders.add($images1, 'images1');
        scene.resources.folders.add($images2, 'images2');
        scene.resources.folders.add($images3, 'images3');
        scene.resources.folders.add($images4, 'images4');
        scene.resources.folders.add($images5, 'images5');
        scene.resources.folders.add($sounds, 'sounds');

        scene.resources.on('load.one', function(resource, loaded, max, percents) {
            console.log('load', percents, '%');
            progressBar.percents = percents;
            progressBar.currentFilePath = resource.path;
        });

        scene.objects.add(progressBar);

        progressBar.on('completed', function() {

        });

        scene.gameLoop.start();
        scene.resources.load();
    });

})();