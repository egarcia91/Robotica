(function(){
	function Trayectoria(div,config){
		HtmlWidget.call(this,div,config);
		this.tiempoAceleracion = 0;
		this.cantidadSegmentos = 0;
		this.tiempoTotal = 0;
	}

	Trayectoria.prototype = Object.create(HtmlWidget.prototype);
	Trayectoria.prototype.constructor = "Trayectoria";
	Trayectoria.prototype.tolerancia = 1e-3;

	Trayectoria.prototype.calcular = function(datos){

		this.tiempoAceleracion = datos.tiempoAceleracion;

		this.cantidadSegmentos = datos.posiciones.length;

		this.posiciones = [];
		this.posiciones = datos.posiciones;

		this.tiempoTotal = datos.tiempoAceleracion;

		for(var i = 0, posicion; posicion = datos.posiciones[i]; i++){
			this.tiempoTotal += posicion.t;
			this.generarFuncion(posicion, i);
		}

	};

	Trayectoria.prototype.generarFuncion = function(p, indice){
	};

	Trayectoria.prototype.tiempoFueraAceleracion = function(t, c){
		return 0;
	};

	Trayectoria.prototype.primerTiempoMedio = function(t, c){
		return 0;
	};

	Trayectoria.prototype.ultimoTiempoMedio = function(t, c){
		return 0;
	};

	Trayectoria.prototype.getTiempoFinal = function(){
		return this.tiempoTotal;
	};

	Trayectoria.prototype.estoyDentroUlitimoMedioTiempoAceleracion = function(t, tiempoSegmento){

		var tiempoFinal = (tiempoSegmento || this.tiempoTotal);
		var medio = this.tiempoAceleracion/2;

		if(math.abs(t - (tiempoFinal - medio)) < this.tolerancia ||  t > (tiempoFinal - medio) ){
			return true;
		}

		return false;

	};

	Trayectoria.prototype.estoyDentroMedioTiempoAceleracion = function(t){

		var medioTiempoAceleracion = this.tiempoAceleracion/2;

		if(math.abs(t - medioTiempoAceleracion) < this.tolerancia || t < medioTiempoAceleracion){
			return true;
		}

		return false;

	};

	Trayectoria.prototype.posicion = function(tiempo){

		var segmento = 0;

		var medioTiempoAceleracion = this.tiempoAceleracion/2;

		if(this.estoyDentroMedioTiempoAceleracion(tiempo)){
			return this.primerTiempoMedio(tiempo);
		}

		if(this.estoyDentroUlitimoMedioTiempoAceleracion(tiempo)){
			return this.ultimoTiempoMedio(tiempo);
		}

		return this.posicionSegmento(this.enSegemnto(tiempo), tiempo);

	};

	Trayectoria.prototype.posicionSegmento = function(c, t){
		var tiempoSegmento = this.posiciones[c.indice].t;

		if(this.estoyDentroMedioTiempoAceleracion(c.tiempoRelativo)){
			return this.primerTiempoMedio(t, c);
		}

		if(this.estoyDentroUlitimoMedioTiempoAceleracion(c.tiempoRelativo, tiempoSegmento)){
			return this.ultimoTiempoMedio(t, c);
		}
		return this.tiempoFueraAceleracion(t, c);
	};

	Trayectoria.prototype.enSegemnto = function(t){
		var tiempoAux = this.tiempoAceleracion/2;
		for(var i = 0, posicion; posicion = this.posiciones[i]; i++){
			var intervaloIn = tiempoAux;
			tiempoAux += posicion.t;
			var intervaloFin = tiempoAux;
			if(math.abs(t - intervaloIn) < this.tolerancia || t > intervaloIn){
				if(math.abs(t - intervaloFin) < this.tolerancia || t < intervaloFin){
					return {
						indice : i,
						tiempoRelativo : t - intervaloIn
					};
				}
			}
		}
	};

	Trayectoria.prototype.constante = function(c){
		return c;
	};

	Trayectoria.prototype.lineal = function(a, b, corr){
		var corrimiento = (corr || 0);
		return a+"(t - "+corrimiento+" )+"+b;
	};

	Trayectoria.prototype.cuadratica = function(a, b, c, corr){
		var corrimiento = (corr || 0);
		return a+"(t - "+corrimiento+")^2 +"+b+"(t - "+corrimiento+") +"+c;
	};


	window.Trayectoria = Trayectoria;
})();


