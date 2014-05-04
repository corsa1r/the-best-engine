(function() {
    "use strict";

    define(['engine/Container'], function(Container) {
        describe('Container object', function() {

            it('can store items.', function() {
                var container = new Container();
                var item = {foo: 'bar'};

                expect(container.has).toBeDefined();
                expect(container.has(item)).toBeFalsy();

                expect(container.add).toBeDefined();
                container.add(item);
                expect(container.has(item)).toBeTruthy();
            });

            it('can store items with name.', function() {
                var container = new Container();
                var item = {foo: 'bar'},
                    second = {foo: 'bar'};

                expect(container.nameOf).toBeDefined();
                expect(container.nameOf(item)).not.toBeDefined();

                expect(container.add).toBeDefined();
                container.add(item, 'name');
                expect(container.nameOf(item)).toBe('name');

                container.add(second, 42);
                expect(container.nameOf(second)).toBe('42');
            });

            it('can store strings.', function() {
                var container = new Container();

                expect(container.nameOf).toBeDefined();
                expect(container.nameOf('foo')).not.toBeDefined();

                expect(container.add).toBeDefined();
                container.add('foo');
                expect(container.nameOf('foo')).toBe('foo');
            });

            it('can return the index of an item.', function() {
                var container = new Container();
                var item = {foo: 'bar'},
                    second = {foo: 'bar'},
                    third = {foo: 'bar'},
                    notFound = {foo: 'bar'};

                expect(container.add).toBeDefined();
                container.add(item);
                container.add(second, 'second');
                container.add(third, 'third');

                expect(container.indexOf).toBeDefined();
                expect(container.indexOf(item)).toBe(0);
                expect(container.indexOf(second)).toBe(1);
                expect(container.indexOf(third)).toBe(2);
                expect(container.indexOf(notFound)).toBe(-1);

                expect(container.indexOf(0)).toBe(0);
                expect(container.indexOf(2)).toBe(2);
                expect(container.indexOf(42)).toBe(-1);

                expect(container.indexOf('second')).toBe(1);
                expect(container.indexOf('third')).toBe(2);
                expect(container.indexOf('not found')).toBe(-1);
            });

            it('can return the name of an item.', function() {
                var container = new Container();
                var item = {foo: 'bar'},
                    second = {foo: 'bar'};

                expect(container.add).toBeDefined();
                container.add(item);
                container.add(second, 'second');

                expect(container.nameOf).toBeDefined();
                expect(container.nameOf(item)).not.toBeDefined();

                expect(container.nameOf(second)).toBe('second');
                expect(container.nameOf(1)).toBe('second');
                expect(container.nameOf('second')).toBe('second');

                expect(container.nameOf('not found')).not.toBeDefined();
            });


        });
    });
}());
