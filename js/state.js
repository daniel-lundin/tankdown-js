var State = function()
{
	
}

State.prototype = {
	mediator:null,
	init:function() {
			
	},
	setMediator:function(med) {
		this.mediator=med;
	},
	draw:function(){
		debug("sprite::draw() not overloaded");
	},
	tick:function(){
		debug("sprite::tick() not overloaded");		
	},
	mousemove: function(coods) {
		
	},
}