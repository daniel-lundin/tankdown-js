var GameState = function() {

}

GameState.prototype = {
	player:null,
	opponent:null,
	init:function() {
		with(this) {
			player = Class.create(PlayerTank);
			opponent = Class.create(OpponentTank);
		}
	},
	tick:function() {
		this.player._tick();
		this.opponent._tick();
	},
	draw: function(g,go,w) {
		g.save();
		with(this) {
			g.fillStyle = "rgb(0,200,0)";
			g.fillRect (0, 0, go.width, go.height);
			player._draw(g,go,w);
			opponent._draw(g,go,w);
		}
		g.restore();
	},	
	click:function(e) {

	},	
	keyup:function(key) {
		this.player._keyup(key);
	},
	keydown:function(key) {
		this.player._keydown(key);
	},
	mousemove:function(coords) {
		this.player._mousemove(coords);
	}
}

