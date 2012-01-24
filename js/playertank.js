var PlayerTank = function() {}

PlayerTank.prototype = {
	keymap:{KEY_UP:0,KEY_DOWN:0,KEY_LEFT:0,KEY_RIGHT:0},
	init:function() {
		this.addSprite(Class.create(PlayerTower));
		this.position = {x:30,y:30};
		this.angle = 0;
		this.parent = null;
	},
	tick:function() {				
		with (this) {
			if (keymap[KEY_LEFT]) {
				angle -= Math.PI/60;
			} else if (keymap[KEY_RIGHT]) {
				angle += Math.PI/60;
			}
			if (keymap[KEY_UP]) {
				position.x+=Math.cos(angle)*5;
				position.y+=Math.sin(angle)*5;
			} else if (keymap[KEY_DOWN]) {
				position.x-=Math.cos(angle)*5;
				position.y-=Math.sin(angle)*5;
			}
            if(keymap[KEY_LEFT] | keymap[KEY_RIGHT] | keymap[KEY_UP] | keymap[KEY_DOWN]) {
                ws.send(this.position.x+";"+this.position.y+";"+this.angle);
            }
		}
	},
	draw: function(g,go,w) {
		with(this) {
			g.drawImage(gfxLoaded.playertank,-35,-20 ,70,40);			
		}
	},
	keyup:function(key) {	
		if ([KEY_UP, 
			 KEY_DOWN, 
			 KEY_LEFT,
			 KEY_RIGHT].indexOf(key) != -1) {
			this.keymap[key]=0;
		}
	},
	keydown:function(key) {		
		if ([KEY_UP, 
			 KEY_DOWN, 
			 KEY_LEFT,
			 KEY_RIGHT].indexOf(key) != -1) {
			this.keymap[key]=1;
		}
	},	
	mousemove:function(coods) {

	},
}
