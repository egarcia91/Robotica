(function(){
	function TrayectoriaIdeal(div,config){
		Trayectoria.call(this,div,config);
		this.tiempoAceleracion = 0;
	}

	TrayectoriaIdeal.prototype = Object.create(Trayectoria.prototype);
	TrayectoriaIdeal.prototype.constructor = "TrayectoriaIdeal";

//	TrayectoriaIdeal.prototype.calcular = function(datos){
//		this.tiempoAceleracion = datos.tiempoAceleracion;
//		console.log('gato');
//		console.log(this.tolerancia);
//
//		var lenPos = datos.posiciones.lenght;
////		var lenVel = velocidadesMaxSegmentos.length;
////		var lenTiem = tiemposSegmentos.length;
//
//		for(var i = 0; posicion = datos.posiciones[i]; i++){
//			console.log(posicion);
//		}
//
//	};

	TrayectoriaIdeal.prototype.esTiempoSegmento = function(tiempo){
		if(math.abs(tiempo - tiempoSegmento) < this.tolerancia){
			console.log("estoy en donde termino")
			return true;
		}
	};

	TrayectoriaIdeal.prototype.posicion = function(tiempo){
		var medioTiempoAceleracion = this.tiempoAceleracion/2;

		if(math.abs(tiempo - medioTiempoAceleracion) < this.tolerancia){
			console.log("estoy en donde empiezo")
			return 0;
		}

		if(this.esTiempoSegmento(tiempo)){
			return 0;
		}

		if( tiempo < medioTiempoAceleracion ){
			console.log("estoy en primer parte plana")
			return 0;
		}

		if( tiempo > medioTiempoAceleracion && tiempo < tiempoSegmento){
			console.log("estoy en parte lineal")
			return 0;
		}

		if( tiempo > tiempoSegmento && tiempo < tiempoFinal){
			console.log("estoy en ultima parte plana")
			return 0;
		}

		return 0;
	};

	window.TrayectoriaIdeal = TrayectoriaIdeal;
})();


