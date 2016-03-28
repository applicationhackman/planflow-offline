import Ember from 'ember';

export default Ember.Controller.extend({
	'editnode-dialog' : false,
	flowchartsymbols : [
			{
				name : "Process",
				id 	 : "process"
			}

	],
	updateConnectionLayer : function(el,connection){
			// console.log("CSK updateConnectionLayer ",arguments , this);
			this.set('selectedConnection',{el:el,c:connection});
			 Ember.run.debounce(this,this.changingConnectionOverlay,600);
			// var cons = instance.getAllConnections();
			// for (var i = cons.length - 1; i >= 0; i--) {
			// 	console.log(cons[i].getOverlays()," i is ",i);
			// }
			// console.log(" this is ",this," in ",$(this).text());
			// Ember.run.debounce(cobj,cobj.get('controller.parentController').updateConnectionLayer.bind(null,$(info.getOverlays().label.canvas),info),600);
	},
	changingConnectionOverlay : function(){

		// console.log("changingConnectionOverlay here ",this.get('params.id')," ",this.get('selectedConnection'));
		var cobj = this;
		var c = this.get('selectedConnection.c');
		var el = this.get('selectedConnection.el');
		var flow = this.store.findById('flow',this.get('params.id'));
			flow.then(function(flow){

				flow.get('nconnections').filter(function(item){
				  // console.log(" n item ",item.sourceId === c.sourceId  ,  item.targetId === c.targetId);
				  if(item.sourceId === c.sourceId  ,  item.targetId === c.targetId){
				  	// item.overlay = $(el).text();
				  	// console.log("item.overlay is ",item, c);
				  	item.labelText = $(el).text();

				  	console.log("after ",item, c.getOverlays().label.labelText," :: ",$(el).text());
				  }
				});

				flow.save();
				// console.log("flow is here ",flow.get('nconnections'),  c.sourceId, c.targetId);

			});

	},
	actions : {
		
		createNode : function (x,y,type) {

			console.log("node x ",x," node y ",y);

			var store = this.store;
			var cobj = this;
			var flow = store.findById('flow',this.get('params.id'));
			flow.then(function(flow){

				var name = "new";
				var nnode = store.createRecord('nodeitem',{name:name,createtime:new Date(),modifiedtime:new Date(),top:y,left:x});
				nnode.pid = nnode.id;
				flow.get('nodes').pushObject(nnode);
				flow.save();

			});

		},
		updateNode : function(id,left,top){

			var store = this.store;
			var flow = store.findById('flow',this.get('params.id'));

			flow.then(function(flow){

				var nodes = flow.get('nodes');

				for (var i = nodes.length - 1; i >= 0; i--) {
					if(nodes[i].pid == id){
						Em.set(nodes[i],'left', left);
						Em.set(nodes[i],'top', top);
						// nodes[i].top = top;
					}
				}

				flow.save();

			});
		},
		deleteNode : function(id){
			console.log("CSK deleting node",id);
			var store = this.store;
			var flow = store.findById('flow',this.get('params.id'));

			flow.then(function(flow){

				var nodes = flow.get('nodes');

				for (var i = nodes.length - 1; i >= 0; i--) {
					if(nodes[i].pid == id){

							var snode = flow.get('nodes').get(i);
							flow.get('nodes').removeAt(i);
							var nconnections = flow.get('nconnections');
							for (var j = nconnections.length - 1; j >= 0; j--) {

								if(nconnections[j].sourceId === snode.pid || nconnections[j].targetId === snode.pid){
									flow.get('nconnections').removeAt(j);
									instance.detach(instance.getAllConnections()[j]);
								}
								
							}
							
					}
				}

				flow.save();

			});

		},
		editNode : function (id) {

				var store = this.store;
				var flow = store.findById('flow',this.get('params.id'));
				var cobj = this;
				this.set('editnode-dialog',!this.get('editnode-dialog'));
				flow.then(function(flow){

					var nodes = flow.get('nodes');

					for (var i = nodes.length - 1; i >= 0; i--) {
						if(nodes[i].pid == id){

								var snode = flow.get('nodes').get(i);
								cobj.set('selectedNode',snode);
						}
					}

					flow.save(); 

				});

		},
		saveNode : function(){

		},
		cancelNode : function(){

		},
		closeEditDialog : function(){
			this.set('editnode-dialog',false);
		},
		selectnode : function(id){
			var store = this.store;
			var cobj  = this;
			var flow = store.findById('flow',this.get('params.id'));
			flow.then(function(flow){

				var nodes = flow.get('nodes');

				for (var i = nodes.length - 1; i >= 0; i--) {
					if(nodes[i].pid == id){

							var snode = flow.get('nodes').get(i);
							cobj.set('selectedNode',snode);
					}
				}

				flow.save();

			});
		}
	},
	nodeSelected : function(){
		$(".w.active").removeClass('active');
		$("#"+this.get('selectedNode.pid')).addClass('active')
		console.log("Node selectnode" , this.get('selectedNode.pid'), $("#"+this.get('selectedNode.pid')));

	}.observes('selectedNode'),
	nodeSelectedProp : function(){

		console.log("node select property changing ",this.get('selectedNode.pid'));
		this.send('selectnode',this.get('selectnode.pid'));

	}.observes('selectedNode.name','selectedNode.left','selectedNode.top','selectedNode.backgroundcolor','selectedNode.textcolor','selectedNode.bwidth')

});
