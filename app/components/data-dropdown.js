import Ember from 'ember';

export default Ember.Component.extend({
	classNames:["menu"],
	didInsertElement : function (argument) {
		$(this.$().parent()).dropdown();
		
		$(this.$().parent()).dropdown('set selected', this.get('model.model.flowtype'));
	}
});
