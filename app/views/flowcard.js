import Ember from 'ember';

export default Ember.View.extend({
	classNames :['flow','card'],
	attributeBindings : ['draggable'],
	draggable:true,
	templateName :'flowcard'
});
