var SplashState = function() {
	
}

SplashState.prototype = {
	tick:function() {
		
	},
	draw: function(g,go,w) {
	try {
		g.drawImage(gfxLoaded.splash,0,0,go.width,go.height);
	} catch(e) {}
	},
	
	click:function(e) {
		this.mediator.nextState();
	},
	keyup:function(key) {
		
	},	
	keydown:function(ey) {
		this.mediator.nextState();
	},
}