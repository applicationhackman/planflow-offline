import Ember from 'ember';

export default Ember.Component.extend({
	classNames : ['ui' ,'selection' ,'dropdown'],
	didInsertElement : function (argument) {
		$(this.$()).dropdown();
		
	}
});
