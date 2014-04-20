module.exports = function(config) {
    "use strict";

    config.set({
        basePath: '',
        frameworks: ['jasmine', 'requirejs'],
        files: [
            {pattern: 'bower_components/**/*.js', included: false},
            'tests/**/*.spec.js'
        ],
        reporters: ['progress'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome'],
        captureTimeout: 9000,
        singleRun: false
    });
};
