var debug = function(str) {
	//if (console)
	console.debug(str);
}

/*var extend = function(child,parent) {
	var F = function(){};
	F.prototype = parent.prototype;
	child.prototype = new F();
	child.prototype.constructor = child;
	child.uber = parent.prototype;
	
	debug("Extending " + typeof(child) + " with " + typeof(parent));
}*/
var extend = function(child,parent) {
	var c = child.prototype || {};
	var p = parent.prototype || parent;
	for (var i in p) {
		if (!c[i]) {
			if (p[i] && typeof p[i] === 'object') {
				c[i] = (p[i] instanceof Array) ? []:{};
				extend(c[i],p[i]);
			} else {
				c[i]=p[i];
			}
		}
	}
	if (p)
		c.uber = p;
}

var Class = {
	create:function(cls) {
		var F = function() {};
		F.prototype = {};
		extend(F,cls);
		var ret = new F();
		ret.init();
		return ret;
	}
}
