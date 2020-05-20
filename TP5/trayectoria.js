(function(){
	function Trayectoria(div,config){
		HtmlWidget.call(this,div,config);
		this.tiempoAceleracion = 0;
		this.cantidadSegmentos = 0;
		this.tiempoTotal = 0;
	}

	Trayectoria.prototype = Object.create(HtmlWidget.prototype);
	Trayectoria.prototype.constructor = "Trayectoria";
	Trayectoria.prototype.tolerancia = 1e-5;

	Trayectoria.prototype.calcular = function(datos){

		console.log(datos);
		this.tiempoAceleracion = datos.tiempoAceleracion;

		console.log(this.tolerancia);

		this.cantidadSegmentos = datos.posiciones.length;
		console.log(this.cantidadSegmentos);

		this.tiempoTotal = datos.tiempoAceleracion;

		for(var i = 0; posicion = datos.posiciones[i]; i++){
			this.tiempoTotal += posicion.t;
			console.log(posicion.t);
			console.log(posicion);
		}
		console.log(this.tiempoTotal);

	};

	Trayectoria.prototype.posicion = function(tiempo){

		var medioTiempoAceleracion = this.tiempoAceleracion/2;

		if(math.abs(tiempo - medioTiempoAceleracion) < this.tolerancia){
			console.log("estoy a la mitad de tiempo de aceleeracion")
			return 0;
		}

		if( tiempo < medioTiempoAceleracion ){
			console.log("estoy antes del primer medio tiempo de aceleracion")
			return 0;
		}

		if(math.abs(tiempo - this.tiempoAceleracion) < this.tolerancia){
			console.log("estoy en tiempo de aceleracion")
			return 0;
		}

		if( tiempo < this.tiempoAceleracion ){
			console.log("estoy antes del primer tiempo de aceleracion")
			return 0;
		}

//		if(this.esTiempoSegmento(tiempo)){
//			return 0;
//		}
//
//		if( tiempo > medioTiempoAceleracion && tiempo < tiempoSegmento){
//			console.log("estoy en parte lineal")
//			return 0;
//		}
//
//		if( tiempo > tiempoSegmento && tiempo < tiempoFinal){
//			console.log("estoy en ultima parte plana")
//			return 0;
//		}

		return 0;
	};

	window.Trayectoria = Trayectoria;
})();


