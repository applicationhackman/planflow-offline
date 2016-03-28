import Ember from 'ember';

export default Ember.View.extend({
	classNames :['fw','fh','ohid'],
	
	willDestroy () {
		
		// var connection = instance.getAllConnections();
		// for (var i = connection.length - 1; i >= 0; i--) {
		// 	// instance.detach(connection[i]);
		// 	// instance.hide(connection[i]);
		// }
		window.instance = null;		
		$(".jsplumb-overlay").remove();
		$(".jsplumb-connector").remove();
		$(".jsplumb-endpoint").remove();
	}
});
