'use strict';

requirejs.config({
    baseUrl: '',
    paths: {
        'component': 'app/component',
        'flight': 'bower_components/flight'
    }
});

require(
    [
        'flight/lib/compose',
        'flight/lib/registry',
        'flight/lib/advice',
        'flight/lib/logger',
        'flight/lib/debug'
    ],

    function(compose, registry, advice, withLogging, debug) {
        debug.enable(true);
        compose.mixin(registry, [advice.withAdvice]);

        require(['app/page/default'], function(initializeDefault) {
            initializeDefault();
        });
    }
);
