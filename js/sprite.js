var Sprite = function() {

}

Sprite.prototype = {
	name:"",
	childs:[],
	position:{x:0,y:0},
	angle:0,
	mediator:null,
	parent:null,
	setMediator:function(med) {
		this.mediator=med;
	},
	addSprite:function(s) {
		this.childs.push(s);
		s.setParent(this);
	},
	setParent:function(p) {
		this.parent=p;
	},	
	getPosition:function() {
		var parPos = {x:0,y:0};
		with(this) {
			if (parent) {
				parPos = parent.getPosition();
			}
			return {x:(parPos.x+position.x),y:parPos.y+position.y};
		}
	},
	getAngle:function() {
		var par=0;
		with(this) {
			if (parent) {			
				par = parent.getAngle();
				debug("Parent angel: " + par);
			}
			return par+angle;
		}
	},
	_draw:function(g,go,w){
		g.save();
		with(this) {
			g.translate(position.x,position.y);
			g.rotate(angle);
			draw(g,go,w);
			for (var i in childs)
				childs[i]._draw(g,go,w);
		}
		g.restore();
	},
	_tick:function(){
		with(this) {
			tick();
			for (var i in childs)
				childs[i]._tick();				
			angle = angle%(2*Math.PI);
		}
	},
	_mousemove: function(coords) {
		if (this.mousemove)
			this.mousemove(coords);	
		with(this){
			for (var i in childs)
				childs[i]._mousemove(coords);
		}
	},		
	_keyup:function(key) {	
		if (this.keyup)
			this.keyup(key);	
	},
	_keydown:function(key) {
		if (this.keydown)
			this.keydown(key);		
	},
}