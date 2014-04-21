module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: ['dist/*'],

        copy: {
            build: {
                files: [
                    {src: 'bower.json', dest: 'dist/'},
                    {src: 'LICENSE', dest: 'dist/'},
                    {src: 'README.md', dest: 'dist/'}
                ]
            }
        },

        karma: {
            run: {
                configFile: 'karma.conf.js'
            }
        },

        requirejs: {
            build: {
                options: {
                    name: 'main',
                    baseUrl: 'src/',
                    mainConfigFile: 'src/config.js',
                    out: 'dist/engine.js',
                    optimize: 'none'
                }
            }
        },

        uglify: {
            build: {
                files: {
                    'dist/engine.min.js': ['dist/engine.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('test', ['karma:run']);
    grunt.registerTask('build', ['requirejs:build', 'uglify:build', 'copy:build']);
    grunt.registerTask('default', ['build']);
};
