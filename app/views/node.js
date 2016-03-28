import Ember from 'ember';

export default Ember.View.extend({
	templateName:'node',
	classNames:['w'],
	needs:['application'],
	didInsertElement : function () {

			var model = this.get('controller.model');
			this.$().attr('id',model.pid);
			var bgc = (model.backgroundcolor === undefined) ? "#fff" : model.backgroundcolor;
			var txtc = (model.textcolor === undefined) ? "#000" : model.textcolor;

			this.$().css({left:model.left,top:model.top,background:bgc,color:txtc});

			window.instance.draggable(this.$(),{
				drag : function(obj){
				}
			});

			var cobj = this;
			this.$().mouseup(function(e){

				if($(e.target).hasClass('dp')){
					cobj.get('controller').send('deleteNode',e.currentTarget.id);
				}else{
					var offset = $(e.currentTarget).offset();
					cobj.get('controller').send('updateNode',e.currentTarget.id, offset.left, offset.top);
				}

			});

			this.$().mouseup(function(e){

				if($(e.target).hasClass('dp')){
					cobj.get('controller').send('deleteNode',e.currentTarget.id);
				}else{
					var offset = $(e.currentTarget).offset();
					cobj.get('controller').send('updateNode',e.currentTarget.id, offset.left, offset.top);
				}
				
			});

			this.$().dblclick(function(e){
					cobj.get('controller').send('editNode',e.currentTarget.id);
			});

			this.$().click(function(e){
					cobj.get('controller').send('selectnode',e.currentTarget.id);
			})


		instance.makeSource(this.$(), {
            filter: ".ep",
            anchor: "Continuous",
            connectorStyle: { strokeStyle: "#5c96bc", lineWidth: 2, outlineColor: "transparent", outlineWidth: 4 },
            connectionType:"basic",
            extract:{
                "action":"the-action"
            },
            maxConnections: 2,
            onMaxConnections: function (info, e) {
                alert("Maximum connections (" + info.maxConnections + ") reached");
            }
        });

        instance.makeTarget(this.$(), {
            dropOptions: { hoverClass: "dragHover" },
            anchor: "Continuous",
            allowLoopback: true
        });



	     var cobj = this;

        instance.bind("beforeDrop", function (connection) {

        	var connection = instance.connect({ source: connection.sourceId, target: connection.targetId, type:"basic" });
        	var ncon = {'sourceId':connection.sourceId,'targetId':connection.targetId};

        	var id  = cobj.get('controller.parentController.params.id');
			var flow = cobj.get('controller').store.findById('flow',id);
			flow.then(function(flow){

				if(flow.get('nconnections') ===  undefined){
					flow.set('nconnections',[]);
				}
				flow.get('nconnections').push(ncon);
				flow.save();

			});

	    });


	    instance.bind("connection", function (info) {
	    	// console.log("CSK trying to set ",info);
	    });

	     instance.bind("click", function (info) {
	     	// console.log("CSK trying to change label ",info, $(info.getOverlays().label.canvas));
	     	$(info.getOverlays().label.canvas).attr('contentEditable',true);
	     	$(info.getOverlays().label.canvas).keyup(function(){
	     		// console.log("layout ",cobj," el ");
	     		// console.log("layout ",cobj," el ",cobj.get('controller.parentController').updateConnectionLayer);
	     		cobj.get('controller.parentController').updateConnectionLayer(this,info);
	     		// cobj.set('controller.parentController.selectedConnection',info);
	     		// Ember.run.debounce(this,cobj.get('controller.parentController').updateConnectionLayer,600)
	     		// console.log("label gets out ");
	     	});

	        // info.connection.getOverlay("label").setLabel(info.connection.id);
	    });

	     instance.bind("beforeDetach", function (connection) {
	     	console.log("CSK beforeDetach s ",connection);

        	var id  = cobj.get('controller.parentController.params.id');

			var flow = cobj.get('controller').store.findById('flow',id);
			flow.then(function(flow){

				if(flow.get('nconnections.length') > 0){

					var nconnections = flow.get('nconnections');
					for (var i = nconnections.length - 1; i >= 0; i--) {
						console.log(nconnections[i].sourceId ===  connection.sourceId, nconnections[i].targetId === connection.targetId);
						if(nconnections[i].sourceId ===  connection.sourceId, nconnections[i].targetId === connection.targetId){
							flow.get('nconnections').removeAt(i);
							instance.detach(connection);
						}
					}
				}

				flow.save();

			});

	    });

	     var nodes = this.get("controller.parentController.model.nodes");
	     // console.log(nodes.length," node is gere ",model, " :: ",this,this.get("controller.parentController.model.nodes"), this.$().index());

	     console.log("index ",nodes.length === this.$().index(), nodes.length , this.$().index());
	     if(nodes.length-1 === this.$().index()){

	    	var cobj = this;

	    	$('.w').dblclick(function(e){

	    		var index = $(e.currentTarget).index()-1;
	    		var nodes = cobj.get("controller.model");
	    		cobj.set("controller.selectedNode",nodes[index]);

			 	$("#editnode").modal();
			});

	    	console.log("final ",cobj.get('controller.parentController').send, " nodes ",nodes[nodes.length-1].pid);

	    	cobj.get('controller.parentController').send('editNode',nodes[0].pid);

	    }
	},
	
	


});
