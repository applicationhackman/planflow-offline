import Ember from 'ember';




export default Ember.Route.extend({
		model(obj) {

			return this.store.findAll('flow');
		},
		setupController (controller,model,trans){


			controller.set('model',model);
			this.store.findAll('groupitem').then(function (obj) {
				// console.log("groupitem found ",obj);
				controller.set('groups',obj);
			})

		}
});
