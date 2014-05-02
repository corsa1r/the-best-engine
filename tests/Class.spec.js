(function(){
    "use strict";

    define(['engine/Class'], function(Class) {
        describe('Class object', function() {

            it('can create a class function.', function() {
                var Constructor = function() {
                    return this;
                };

                var Ancestor = function() {
                    return this;
                };

                var ClassFunction = new Class('name', Constructor);

                expect(ClassFunction.extend).toBeDefined();

                ClassFunction.extend(Ancestor);
                var classObject = new ClassFunction();
                expect(classObject instanceof Ancestor).toBeTruthy();

                expect(ClassFunction.getName).toBeDefined();

                expect(ClassFunction.getName()).toBe('name');
            });
        });
    });
}());
