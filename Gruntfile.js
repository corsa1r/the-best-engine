module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: ['dist/*'],

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    //grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('default', []);
};
