/**
 * @file implements Advanced Container class
 * 
 * @author CORSAIR <vladimir.corsair@gmail.com>
 * @version 18.09.2014
 */
;(function () {
    
    //"use strict";
    
    define(['src/engine/Container'], function (Container) {
        
        /**
         * Advanced Container class extends add and remove methods of the container with advanced functionllity
         * @returns {_L11.AdvancedContainer}
         */
        var AdvancedContainer = function () {
            AdvancedContainer.super.constructor.call(this);
            
            this.advancedCalls = new Container();
            
            this.advancedCalls.add(new Container(), 'on.add');
            this.advancedCalls.add(new Container(), 'on.remove');
        };
        
        AdvancedContainer.extend(Container);
        
        /**
         * @public
         * This method set an advanced functionallity to all objects which going to add into this Container
         * 
         * @param {String} callName the name of the function
         * @param {String} itemRefName reference name of this advanced addon, to handle it easy in remove
         * @returns undefined
         */
        AdvancedContainer.prototype.setAdvancedOnAdd = function (/* ... extra args ...*/) {
            var _arguments = Array.prototype.slice.call(arguments);
            _arguments.push('on.add');
            
            this.$setAdvanced.apply(this, _arguments);
        };
        
        /**
         * @public
         * This method set an advanced functionallity to all objects which going to be removed from this Container
         * 
         * @param {String} callName the name of the function
         * @param {String} itemRefName reference name of this advanced addon, to handle it easy in remove
         * @returns undefined
         */
        AdvancedContainer.prototype.setAdvancedOnRemove = function (/* ... extra args ...*/) {
            var _arguments = Array.prototype.slice.call(arguments);
            _arguments.push('on.remove');
            
            this.$setAdvanced.apply(this, _arguments);
        };
        
        /**
         * @private
         * @returns undefined
         */
        AdvancedContainer.prototype.$setAdvanced = function () {
            var _arguments = Array.prototype.slice.call(arguments);

            var callName    = _arguments.shift();
            var itemRefName = _arguments.shift();
            
            this.advancedCalls.get(_arguments.pop()).add({
                name: callName,
                args: _arguments
            }, itemRefName);
        };
        
        /**
         * @public
         * @extends Container.add
         * This methods override Container.add
         * This method call advances
         * @param {*} item
         * @param {*} name
         * @returns undefined
         */
        AdvancedContainer.prototype.addSort = function (item, name, sortField, sortAsc) {
            AdvancedContainer.super.add.call(this, item, name);
            this.sort(sortField || 'zindex', Boolean(sortAsc));
            this.$callAdvances(item, 'on.add');
        };

        AdvancedContainer.prototype.sort = function(sortField, sortAsc) {
            AdvancedContainer.super.sort.call(this, sortField, sortAsc);
        };
        
        /**
         * @public
         * @extends Container.remove
         * This methods override Container.remove
         * This method call advances
         * @param {*} what - here you can pass the reference name
         * @returns undefined
         */
        AdvancedContainer.prototype.remove = function (what) {
            var item = AdvancedContainer.super.get.call(this, what);
            AdvancedContainer.super.remove.call(this, what);
            this.$callAdvances(item, 'on.remove');
        };
        
        /**
         * @private
         * This method calls the advances
         * 
         * If you set OnAdd addon with name "test"
         * Every single object wich has an 'test' function into the constructor class or into the prototype,
         *  the 'test' function will be invoked/called with parameters 
         *  which are provided by you in the set methods with extra params
         * 
         * @param {*} item - container item
         * @param {Stirng} which on.add or on.remove
         * @returns undefined
         */
        AdvancedContainer.prototype.$callAdvances = function (item, which) {
            this.advancedCalls.get(which).each(function (advancedCall) {
                if(item[advancedCall.name] instanceof Function || typeof item[advancedCall.name] === "function") {
                    item[advancedCall.name].apply(item, advancedCall.args);
                }
            });
        };
        
        return AdvancedContainer;
    });
    
})();