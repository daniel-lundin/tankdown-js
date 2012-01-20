var CONST = {
	KEYS:{
        UP:38,
		DOWN:40,
		LEFT:37,
		RIGHT:39,
		D:68,
		A:65,
	}
}
var gfxFiles = {
	splash:'tank.jpg',
	playertank:'MovableObjs/tank.gif',
	playertower:'MovableObjs/torn.gif',	
}
var gfxLoaded = {};




var EventHandler = function() {

}
EventHandler.prototype = {
	canvas:null,
	listener:null,
	setListener:function(l) { this.listener = l; },
	init:function() {
		this.canvas = document.getElementById("game");
	},
	register: function(target) {
		var that = this;
		target.addEventListener('click',function(e) {
			that.click.call(that,e);
		},false);
		target.addEventListener('keydown',function(e) {
			that.keydown.call(that,e);
		},false);
		target.addEventListener('keyup',function(e) {
			that.keyup.call(that,e);
		},false);
		target.addEventListener('mousemove',function(e) {
			that.mousemove.call(that,e);
		},false);
	},
	click: function(e) {
		this.listener.click(e);
	}
	,
	keydown: function(e) {
		debug("Keycode: " + e.keyCode);
		this.listener.keydown(e.keyCode);
	}
	,
	keyup: function(e) {
		this.listener.keyup(e.keyCode);
	},
	mousemove: function(e) {
		this.listener.mousemove(this.getCanvasMouseCoord(e));
	},
	getCanvasMouseCoord: function(e) {
		return {x:(e.pageX-this.canvas.offsetLeft), y:(e.pageY-this.canvas.offsetTop)}
	}
}

var StateEngine = function() {
	
}
StateEngine.prototype = {
	curri:0,
	states: [],
	evnth: null,
	init:function() {
	},
	setEventHandler:function(eh) { this.evnth=eh; },
	addState:function(state) { 
		if (this.states.length == 0) {			
			this.evnth.setListener(state);
		}
		this.states.push(state); 
		state.setMediator(this); 
	},
	nextState:function() {
		with(this) {
			curri = (curri+1)% states.length;		
			evnth.setListener(states[curri]);
			debug("Changed state to " + curri); 
		}
	},
	draw:function() {
		with(this) {
			var g = document.getElementById("game").getContext('2d');
			states[curri].draw(g, document.getElementById("game"), {});
		}
	},
	tick:function() {		
		with(this) {
			states[curri].tick();
		}
	},
}


var init = function()
{
	extend(GameState,State);
	extend(SplashState,State);
	extend(PlayerTank,Sprite);
	extend(PlayerTower,Sprite);	

	
	var toLoad = gfxFiles.length;
	for (var key in gfxFiles) {
		gfxLoaded[key] = new Image();
		gfxLoaded[key].src = 'gfx/' + gfxFiles[key];
		gfxLoaded[key].onload = function() { --toLoad; }
		debug("Loading " + key + ": " + gfxFiles[key]);
	}	
	while(toLoad > 0);
	
	var state = null;
	var statee = null;
	var evnth = null;
	var g2d = null;
	var gobj = null;
	
	statee = Class.create(StateEngine);
	evnth = Class.create(EventHandler);
	
	evnth.register(window);
	statee.setEventHandler(evnth);
	
	statee.addState(Class.create(SplashState));
	statee.addState(Class.create(GameState));

	setInterval(function() { statee.tick(); statee.draw() },25);
}

window.onload = init;
