(function(){
	function GeneradorTrayectoria(div,config){

		for(var i = 0, elemento; elemento = this.lista[i]; i++){
			this["trayectoria"+elemento] = new window["Trayectoria"+elemento](null,{});
		}

	}

	GeneradorTrayectoria.prototype.constructor = "GeneradorTrayectoria";

	GeneradorTrayectoria.prototype.lista = [
		"Ideal",
		"Real"
	];

	GeneradorTrayectoria.prototype.resultados = function(){
		var tiempo = this.trayectoria.tiempo;
		var tiempos = linspace(0, tiempo, 11);
		var lista = {};

		for(var i = 0, t; (t = tiempos[i]) != undefined; i++){
			for(var j = 0, tipo; tipo = this.lista[j]; j++){
				if(!lista[tipo]){
					lista[tipo] = [];
				}
				lista[tipo].push([t,this.trayectoria[tipo].posicion(t)]);
			}
		}

		console.log(lista);


	};

	GeneradorTrayectoria.prototype.generar = function(data){

		this.trayectoria = {};

		for(var i = 0, elemento; elemento = this.lista[i]; i++){
			this["trayectoria"+elemento].calcular(data);
			if(this.trayectoria.tiempo == undefined){
				this.trayectoria.tiempo = this["trayectoria"+elemento].getTiempoFinal();
			}
			this.trayectoria[elemento] = {
				posicion : this["trayectoria"+elemento].posicion,
				velocidad : this["trayectoria"+elemento].velocidad,
				aceleracion : this["trayectoria"+elemento].aceleracion
			}
		}
		//console.log(this.trayectoria);
	};

	window.GeneradorTrayectoria = GeneradorTrayectoria;
})();


