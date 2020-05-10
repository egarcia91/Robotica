(function(){
	function TrayectoriaReal(div,config){
		HtmlWidget.call(this,div,config);
	}

	TrayectoriaReal.prototype = Object.create(HtmlWidget.prototype);
	TrayectoriaReal.prototype.constructor = "TrayectoriaReal";

	TrayectoriaReal.prototype.calcular = function(datos){
//	TrayectoriaReal.prototype.calcular = function(posiciones, velocidadesMaxSegmentos, tiemposSegmentos, tacc){
		console.log(datos);

		var lenPos = posiciones.lenght;
		var lenVel = velocidadesMaxSegmentos.length;
		var lenTiem = tiemposSegmentos.length;

		for(var i = 0; posicion = posiciones[i]; i++){
			console.log(posicion);
		}

	};

	TrayectoriaReal.prototype.parteLineal = function(velmax, t){

		b = velmax;

		return b*t + c;
	};

	TrayectoriaReal.prototype.parteCuadraticaInicial = function(posicionInicial, tiempoAceleracion, velocidadMaxima, t){

		c = posicionInicial;
		a = velocidadMaxima/(2*tiempoAceleracion);

		return a*t*t + c;
	};

	TrayectoriaReal.prototype.parteCuadraticaIntermedio = function(posicionInicial, tiempoAceleracion, velocidadMaxima, t){

		return a*t*t + b*t + c;
	};

	TrayectoriaReal.prototype.parteCuadraticaFinal = function(posicionInicial, tiempoAceleracion, velocidadMaxima, t){

		return a*t*t + c;
	};

	window.TrayectoriaReal = TrayectoriaReal;
})();


