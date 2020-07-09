(function(){
	function GeneradorTrayectoria(div,config){

		for(var i = 0, elemento; elemento = this.lista[i]; i++){
			this["trayectoria"+elemento] = new window["Trayectoria"+elemento](null,{});
		}

	}

	GeneradorTrayectoria.prototype.constructor = "GeneradorTrayectoria";
	GeneradorTrayectoria.prototype.cantidadEquiespacios = 1001;

	GeneradorTrayectoria.prototype.lista = [
		"Ideal",
		"Real"
	];

	GeneradorTrayectoria.prototype.generar = function(data){

		this.trayectoria = {};

		for(var i = 0, elemento; elemento = this.lista[i]; i++){
			this["trayectoria"+elemento].calcular(data);
			this.trayectoria[elemento] = this["trayectoria"+elemento].resultados(this.cantidadEquiespacios);
		}

		return JSON.parse(JSON.stringify(this.trayectoria));
	};

	window.GeneradorTrayectoria = GeneradorTrayectoria;
})();


