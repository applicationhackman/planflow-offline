import Ember from 'ember';

export default Ember.Controller.extend({

		createplandialog:false,
		searchFlows : [],
		newplan  : {
			name:'',
			description : ''
		},
		newgroup  : {
			name:'',
			description : ''
		},
		actions : {
			showPlan : function () {
					console.log("showPlan is here ");
					this.set('createplandialog',true);
					$('#createflow').modal('show');
					
			},
			cancelPlan : function () {
				this.set('createplandialog',false);
			},
			createPlan  : function(){
				var nplan = this.get('newplan');
				var plan = this.store.createRecord('flow',{name:nplan.name,description:nplan.description,createtime:new Date(),modifiedtime:new Date()});
				plan.save();
				$('.ui.modal').modal('hide');
			},
			createGroup  : function(){
				console.log("CSK trying to create group ",this.get('newgroup.name'));
				// var nplan = this.get('newplan');
				var cobj = this;
				var group = this.store.createRecord('groupitem',{name:this.get('newgroup.name'),createtime:new Date(),modifiedtime:new Date()});
				group.save().then(function(){
					cobj.set('newgroup.name','');
					console.log("group save suc",arguments);
				});

				// $('.ui.modal').modal('hide');
			},
			showEditDialog : function(){
				$("#editflow").modal('show')
			},
			saveFlow : function(){
				
			},
			cancelFlow : function(){
				$('.ui.modal').modal('hide');
			},
			searchFlow : function(val){
			  console.log("CSK trying to searchFlow ",this, arguments);
			  var cobj = this;
			  var flowItems = [];
			  this.store.filter("flow",function(items){
			  	if(items.get('name').toLowerCase().indexOf(val) >= 0){

			  		flowItems.push(items)
			  		
				   
			  	}
			  })
			  cobj.set('searchFlows',flowItems);
			}
		}

});
