
var OpponentTank = function() {}

OpponentTank.prototype = {
	init:function() {
		this.addSprite(Class.create(PlayerTower));
		this.position = {x:30,y:30};
		this.angle = 0;
		this.parent = null;
	},
	tick:function() {
        this.position = opponent_pos;
        this.angle = opponent_angle;
	},
	draw: function(g,go,w) {
		with(this) {
			g.drawImage(gfxLoaded.playertank,-35,-20 ,70,40);			
		}
	},
}
