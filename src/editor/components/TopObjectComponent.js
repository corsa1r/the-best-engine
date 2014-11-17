;(function () {
	
	define([
		'src/editor/SceneEditorComponent',
		'src/engine/Container',
		'src/editor/components/ObjectSelectorComponent'
		], function(SceneEditorComponent, Container, ObjectSelectorComponent) {

		var TopObjectComponent = function() {
			TopObjectComponent.super.constructor.call(this);
		};

		TopObjectComponent.extend(SceneEditorComponent);

		TopObjectComponent.prototype.run = function() {

			this.sceneEditor.components.attach(new ObjectSelectorComponent(), 'ObjectSelectorComponent');

			this.on('found', (function(objects) {
				this.sceneEditor.components.get('ObjectSelectorComponent').fire('found', this.getTopIndex(objects).last());
			}).bind(this));
		};

		TopObjectComponent.prototype.getTopIndex = function(container) {
			var maxs = new Container();
			var first = container.first();

			if(!first) {
				return maxs;
			}

			var maxIndex = first.zindex || 0;

			container.each(function(item, id, name) {
				if(!item.zindex) {
					item.zindex = 0;
				}

				if(item.zindex > maxIndex) {
					maxIndex = item.zindex;
					maxs.empty();
				}

				if(item.zindex === maxIndex) {
					maxs.add(item, name);
				}
			});

			return maxs;
		};
		
		return TopObjectComponent;
	});
			
})();