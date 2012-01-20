var PlayerTank = function() {}

PlayerTank.prototype = {
	keymap:{37:0,38:0,39:0,40:0},
	init:function() {
		this.addSprite(Class.create(PlayerTower));
		this.position = {x:30,y:30};
		this.angle = 0;
		this.parent = null;
	},
	tick:function() {				
		with (this) {
			if (keymap[CONST.KEYS.LEFT]) {
				angle -= Math.PI/60;
			} else if (keymap[CONST.KEYS.RIGHT]) {
				angle += Math.PI/60;
			}
			if (keymap[CONST.KEYS.UP]) {
				position.x+=Math.cos(angle)*5;
				position.y+=Math.sin(angle)*5;
			} else if (keymap[CONST.KEYS.DOWN]) {
				position.x-=Math.cos(angle)*5;
				position.y-=Math.sin(angle)*5;
			}
		}
	},
	draw: function(g,go,w) {
		with(this) {
			g.drawImage(gfxLoaded.playertank,-35,-20 ,70,40);			
		}
	},
	keyup:function(key) {	
		if (37 <= key && key <= 40) {
			this.keymap[key]=0;
		}
	},
	keydown:function(key) {		
		if (37 <= key && key <= 40) {
			this.keymap[key]=1;
		}
	},	
	mousemove:function(coods) {

	},
}