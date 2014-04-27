(function() {
    "use strict";

    var tests = [],
        file;

    for (file in window.__karma__.files) {
        if (window.__karma__.files.hasOwnProperty(file)) {
            if (/\.spec\.js$/.test(file) && !/\/bower_components\//.test(file)) {
                console.log(file);
                tests.push(file);
            }
        }
    }

    requirejs.config({
        baseUrl: '',
        deps: tests,
        callback: window.__karma__.start
    });
}());