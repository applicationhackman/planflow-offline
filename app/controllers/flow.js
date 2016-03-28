import Ember from 'ember';

export default Ember.Controller.extend({

		createplandialog:false,
		newplan  : {
			name:'',
			description : ''
		},
		actions : {
			showPlan : function () {
					this.set('createplandialog',true);
					$('.ui.modal').modal('show');
					
			},
			cancelPlan : function () {
				this.set('createplandialog',false);
			},
			createPlan  : function(){
				var nplan = this.get('newplan');
				var plan = this.store.createRecord('flow',{name:nplan.name,description:nplan.description,createtime:new Date(),modifiedtime:new Date()});
				plan.save();
				$('.ui.modal').modal('hide');
			}
		}

});
