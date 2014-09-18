;(function () {
    
    define(['src/engine/helpers/AdvancedContainer', 'src/engine/GameObject'], function (AdvancedContaienr, GameObject) {
        
        var TestGO = function () {
            TestGO.super.constructor.call(this);
        };
        
        TestGO.extend(GameObject);
        
        TestGO.prototype.init = function () {
            console.info(arguments);
        };
        
        TestGO.prototype.destroy = function () {
            console.warn(arguments);
        };
        
        var ac = new AdvancedContaienr();
        
        ac.setAdvancedOnAdd('init', 'init', 1, 2, 3);
        ac.setAdvancedOnRemove('destroy', 'destroy', 3, 2, 1);
        
        ac.add(new TestGO(), 'test');
        console.log(ac.has('test'));
        ac.remove('test');
    });
    
})();