import Ember from 'ember';

export default Ember.Route.extend({
		model : function (params) {

				 window.instance = jsPlumb.getInstance({
				    Endpoint: ["Dot", {radius: 2}],
				    Connector:"StateMachine",
				    HoverPaintStyle: {strokeStyle: "#1e8151", lineWidth: 2 },
				    ConnectionOverlays: [
				        [ "Arrow", {
				            location: 1,
				            id: "arrow",
				            length: 14,
				            foldback: 0.8
				        } ],
				        [ "Label", { label: "FOO", id: "label", cssClass: "aLabel" }]
				    ],
				    Container: "canvas"
				});

				window.instance.registerConnectionType("basic", { anchor:"Continuous", connector:"Bezier" });
				
				this.set('params',params);

				return this.store.findById('flow',params.id);

		},
		setupController : function(controller, model, trans){

			controller.set('params',this.get('params'));
			controller.set('model',model);

			var nconnections = model.get('nconnections');
			console.log("nconnections is ",nconnections)
			if(nconnections !== undefined){

	    			Em.run.later(function(){

	    				for(var i=0; i<nconnections.length; i++){
						   console.log("CSK done ",nconnections[i]);
						   if(nconnections[i] !== undefined){
						   		var flowtype = (model.get('flowtype') !== undefined) ? model.get('flowtype') : "Bezier";
		    					var con = instance.connect({ source: nconnections[i].sourceId, target: nconnections[i].targetId, type:"basic",connector:flowtype });
		    					var connectionString = con.id;
		    					if(nconnections[i].hasOwnProperty('labelText')){
		    						connectionString = nconnections[i].labelText;
		    					}
		    					con.getOverlay("label").setLabel(connectionString);	
		    				}
		    				
						}


	    			},400)
			}	    			
	    			

		}
});
