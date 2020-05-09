(function(){
	function TrayectoriaReal(div,config){
		HtmlWidget.call(this,div,config);
	}

	TrayectoriaReal.prototype = Object.create(HtmlWidget.prototype);
	TrayectoriaReal.prototype.constructor = "TrayectoriaReal";

	TrayectoriaReal.prototype.calcular = function(tacc, posi, posf, velmax, tiempo){
		parteCuadratica

		parteLineal

	};

	TrayectoriaReal.prototype.parteLineal = function(velmax, t){

		b = velmax;

		return b*t + c
	};

	TrayectoriaReal.prototype.parteCuadráticaInicial = function(posicionInicial, tiempoAceleracion, velocidadMaxima, t){

		c = posicionInicial;
		a = velocidadMaxima/(2*tiempoAceleracion);

		return a*t*t + c
	};

	window.TrayectoriaReal = TrayectoriaReal;
})();


