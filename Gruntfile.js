module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        clean: ['dist/*'],

        copy: {
            packaging: {
                files: [
                    {src: 'bower.json', dest: 'dist/'}
                ]
            },

            documentation: {
                files: [
                    {src: 'LICENSE', dest: 'dist/'},
                    {src: 'README.md', dest: 'dist/'}
                ]
            },

            development: {
                files: [
                    {cwd: 'src/', src: '**', dest: 'dist/', expand: true}
                ]
            }
        },

        karma: {
            development: {
                configFile: 'karma.conf.js',
            },

            continuous: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            }
        },

        requirejs: {
            almond: {
                options: {
                    name: 'bower_components/almond/almond',
                    baseUrl: '',
                    mainConfigFile: 'src/config.js',
                    out: 'dist/engine.js',
                    optimize: 'none',
                    wrap: {
                        start: '(function() {\n',
                        end: '}());\n'
                    }
                }
            },
        },

        uglify: {
            task: {
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

    grunt.registerTask('test', ['karma:development']);
    grunt.registerTask('standalone', ['clean', 'requirejs:almond', 'uglify:task', 'copy:documentation', 'copy:packaging']);
    grunt.registerTask('development', ['clean', 'copy:development', 'copy:documentation']);
    grunt.registerTask('default', ['dev']);
};
