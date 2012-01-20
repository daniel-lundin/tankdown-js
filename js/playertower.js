var PlayerTower = function(){}

PlayerTower.prototype = {
	speed:Math.PI/40,
	aimTowards:{x:100,y:100},
	aimAngle:0,
	keymap:{},
	init:function() {
		this.keymap[CONST.KEYS.D]=0;
		this.keymap[CONST.KEYS.A]=0;
		this.position = {x:0,y:0};
		this.aimTowards = {x:0,y:0};
		this.angle=0;
		this.parent = null;
	},
	tick:function() {
		with (this) {
			var pos = getPosition();
			var dx = aimTowards.x - pos.x;
			var dy = aimTowards.y - pos.y;			
			var targetAngle;
            //Justera beroende p<E5> vilken kvadrant man <E4>r i
            //T<E4>nk p<E5> att enhetscirkeln blir spegelv<E4>nd i x-axeln
			if(dy<=0 && dx>=0) { //4:e kvadranten
				targetAngle = 2*Math.PI + Math.atan(dy/dx);
			} else if(dy<=0 && dx<=0) { //3:a kvadranten
				targetAngle = Math.PI + Math.atan(dy/dx);
			} else if(dy>=0 && dx<=0) { //1:e kvadranten 
				targetAngle = Math.PI + Math.atan(dy/dx);
			} else if(dy>=0 && dx>=0) { //2:e kvadranten
				targetAngle = Math.atan(dy/dx);
			}
			targetAngle -= parent.getAngle();
			targetAngle=targetAngle%(2*Math.PI);
			angle=targetAngle;
		}			
	},
	draw: function(g,go,w) {
		with(this) {
			g.drawImage(gfxLoaded.playertower,-20,-15);
		}
	},	
	keyup:function(key) {	
		if (key == CONST.KEYS.D || key == CONST.KEYS.A) {
			this.keymap[key]=0;
		}
	},
	keydown:function(key) {
		if (key == CONST.KEYS.D || key == CONST.KEYS.A) {
			this.keymap[key]=1;
		}
	},	
	mousemove: function(coords) {
		with(this) {
			aimTowards = coords;
		}
	},
}