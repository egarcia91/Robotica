(function(){
	function TrayectoriaReal(div,config){
		HtmlWidget.call(this,div,config);

		this.tiempoAceleracion = 0;
		this.tiempoTotalSegmentos = 0;
	}

	TrayectoriaReal.prototype = Object.create(HtmlWidget.prototype);
	TrayectoriaReal.prototype.constructor = "TrayectoriaReal";

//	TrayectoriaReal.prototype.calcular = function(datos){
//
//		this.tiempoAceleracion = datos.tiempoAceleracion;
//		this.tiempoTotalSegmentos = this.tiempoAceleracion;
//
//		for(var i = 0; posicion = datos.posiciones[i]; i++){
//			this.tiempoTotalSegmentos += posicion.t;
//			console.log(posicion);
//			console.log('perro');
//		}
//
//		console.log(this.tiempoTotalSegmentos);
//
//	};

	TrayectoriaReal.prototype.eval = function(tiempo){
	};

	window.TrayectoriaReal = TrayectoriaReal;
})();


