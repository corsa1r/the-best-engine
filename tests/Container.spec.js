(function() {
    "use strict";

    define(['engine/Container'], function(Container) {
        describe('Container object', function() {

            it('can store items and check for stored items.', function() {
                var container = new Container();
                var item = {foo: 'bar'};

                expect(container.has(item)).toBeFalsy();

                container.add(item);
                expect(container.has(item)).toBeTruthy();
            });
        });
    });
}());
