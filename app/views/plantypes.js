import Ember from 'ember';

export default Ember.View.extend({
		classNames :['ui','selection','dropdown'],
		templateName :'plantypes',
		didInsertElement  : function () {

			$(this.$()).dropdown();
			var items = $(this.$()).find('.menu').children();
			var cobj = this;
			console.log("items is ",items);
			items.click(function(e){
				cobj.send("chooenItem",e);
			})
		},
		actions : {
			chooenItem : function(e){
				// console.log("chooenItem is ",$(e.currentTarget).attr('data-value'));
				this.set('selectedVal',$(e.currentTarget).attr('data-value'));

					var store = this.get('controller.store');
					var flow = store.findById('flow',this.get('controller.parentController.params.id'));
					var flowtypes = ['Flowchart','Bezier','StateMachine','Straight'];
					var chosenType = flowtypes[$(e.currentTarget).attr('data-value')-1];
					var cobj = this;
					console.log("setting flow type ",this," view is ",this.get('view'));

					flow.then(function(flow){

						flow.set('flowtype',chosenType);
						flow.flowtype = chosenType;
						var nodes = flow.get('nodes');
						flow.save();
						// var allconnections = instance.getAllConnections();
						// for (var i = 0; i < allconnections.length; i++) {
						// 	var overlays = allconnections[i].getOverlays();
						// 	// console.log("overlays is here ",overlays);
						// 	allconnections[i].setConnector("StateMachine");
						// }
						// console.log("flowtype is ",flow.get('flowtype'));

					});
				
				// this.set('selectedName',$(e.currentTarget).text());
			}
		}
});
