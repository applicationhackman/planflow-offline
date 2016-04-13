import Ember from 'ember';

export default Ember.View.extend({
	classNames : ['ui','button','nobr'],
	attributeBindings : ['draggable'],
	draggable : true,
	templateName :'mainnode',
	dragStart (e){
		// e.dataTransfer.setData('');
		// console.log("Drag started ",e.target, " this ",, this.get('controller.model'));
	},
	dragEnd (e){
		var pos = e.originalEvent;
		this.get('controller').send('createNode',pos.x,pos.y);
	}
});
