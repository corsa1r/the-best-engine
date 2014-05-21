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

            it('can insert items in the container', function() {
                var container = new Container();
                var first = {foo: 'first'},
                    second = {foo: 'second'},
                    third = {foo: 'third'},
                    zeroth = {foo: 'zeroth'};

                expect(container.add).toBeDefined();
                container.add({foo: 'bar'});
                container.add({foo: 'bar'});

                expect(container.insert).toBeDefined();
                expect(container.indexOf).toBeDefined();

                // Insert at given index (with name):
                container.insert(1, first, {name: 'first'});
                expect(container.indexOf(first)).toBe(1);

                // Insert after given index:
                container.insert(1, second, {after: true});
                expect(container.indexOf(second)).toBe(2);

                // Insert after given reference:
                container.insert(second, third, {after: true});
                expect(container.indexOf(third)).toBe(3);

                // Insert before given reference by name:
                container.insert('first', zeroth);
                expect(container.indexOf(zeroth)).toBe(1);
            });

            it('can remove items from the container', function() {
                var container = new Container();
                var first = {foo: 'first'},
                    second = {foo: 'second'},
                    third = {foo: 'third'},
                    last = {foo: 'last'};

                expect(container.add).toBeDefined();
                container.add(first, 'first');
                container.add(second);
                container.add(third);
                container.add(last);

                expect(container.remove).toBeDefined();

                // Remove by reference:
                expect(container.indexOf(second)).toBe(1);
                container.remove(second);
                expect(container.indexOf(second)).toBe(-1);

                // Remove by index:
                expect(container.indexOf(third)).toBe(2);
                container.remove(2);
                expect(container.indexOf(third)).toBe(-1);

                // Remove by name:
                expect(container.indexOf(first)).toBe(0);
                container.remove('first');
                expect(container.indexOf(first)).toBe(-1);
            });

            it('can invoke methods of contained objects', function() {
                var container = new Container();
                var first = {method: jasmine.createSpy('first.method')},

                    spySecond = jasmine.createSpy('second.method.spy'),
                    second = {method: function() {
                        spySecond(this, arguments);
                    }},

                    third = {method: 'is not a function'},
                    last = {field: 'has no method'};

                expect(container.add).toBeDefined();
                container.add(first);
                container.add(second);
                container.add(third);
                container.add(last);

                expect(container.invoke).toBeDefined();
                container.invoke('method', 'foo', 'bar', 42);
                expect(first.method).toHaveBeenCalledWith('foo', 'bar', 42);
                expect(spySecond).toHaveBeenCalledWith(second, ['foo', 'bar', 42]);
            });

            it('can call all contained functions', function() {
                var container = new Container();
                var first = jasmine.createSpy('first'),
                    second = jasmine.createSpy('second'),
                    third = {is: 'not a function'},
                    last = new Container();
                var another = jasmine.createSpy('another');

                expect(container.add).toBeDefined();
                container.add(first);
                container.add(second);
                container.add(third);
                container.add(last);
                last.add(another);

                expect(container.invoke).toBeDefined();
                container.call('foo', 'bar', 42);
                expect(first).toHaveBeenCalledWith('foo', 'bar', 42);
                expect(second).toHaveBeenCalledWith('foo', 'bar', 42);
                expect(another).toHaveBeenCalledWith('foo', 'bar', 42);
                expect(another.callCount).toBe(1);
            });

            it('can apply arguments to all contained functions', function() {
                var container = new Container();
                var first = jasmine.createSpy('first'),
                    second = jasmine.createSpy('second'),
                    third = {is: 'not a function'},
                    last = new Container();
                var another = jasmine.createSpy('another');

                expect(container.add).toBeDefined();
                container.add(first);
                container.add(second);
                container.add(third);
                container.add(last);
                last.add(another);

                expect(container.invoke).toBeDefined();
                container.apply(['foo', 'bar', 42]);
                expect(first).toHaveBeenCalledWith('foo', 'bar', 42);
                expect(second).toHaveBeenCalledWith('foo', 'bar', 42);
                expect(another).toHaveBeenCalledWith('foo', 'bar', 42);
                expect(another.callCount).toBe(1);
            });
        });
    });
}());
