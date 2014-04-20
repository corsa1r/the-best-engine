module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: ['dist/*'],

        karma: {
            run: {
                configFile: 'karma.conf.js'
        copy: {
            dev: {
                files: [
                     {expand: true, cwd: 'src/', src: ['**'], dest: 'dist/', ext: '.js'},
                     {expand: true, src: ['bower_components/**'], dest: 'dist/'}
                ]
            }
        },

        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('test', ['karma:run']);
    grunt.registerTask('build:dev', ['clean', 'copy:dev']);
    //grunt.registerTask('build:prod', ['clean', ...]);
    grunt.registerTask('default', ['build:dev']);
};
