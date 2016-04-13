import Ember from 'ember';

export default Ember.TextField.extend({
	tagName: 'input',
	didInsertElement : function () {

		var clrVal = this.get('value');
		if(this.get('value') === undefined){
			clrVal = "#000";
		}
		var cobj = this;
		$(this.$()).spectrum({
		    color: clrVal,
		    change: function(color) {
		    	var clr = "#"+color.toHex();
		    	
		    	$(cobj.$()).val(clr);
		    	console.log("CSK color is ",clr, cobj.$(), $(cobj.$()).val());
		    	// console.log("CSK color code is here ",color, " color.toHex() ",color.toHex());
			    cobj.set('value',clr);

			}
		});
	},

});
