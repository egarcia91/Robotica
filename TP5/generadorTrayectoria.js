(function(){
	function GeneradorTrayectoria(div,config){

		for(var i = 0, elemento; elemento = this.lista[i]; i++){
			this["trayectoria"+elemento] = new window["Trayectoria"+elemento](null,{});
		}

	}

	GeneradorTrayectoria.prototype.constructor = "GeneradorTrayectoria";
	GeneradorTrayectoria.prototype.cantidadEquiespacios = 1001;
	GeneradorTrayectoria.prototype.largoEslabon1 = 0.4;
	GeneradorTrayectoria.prototype.largoEslabon2 = 0.3;

	GeneradorTrayectoria.prototype.lista = [
		"Ideal",
		"Real"
	];

	GeneradorTrayectoria.prototype.transformacion = function(x, y, z, g){
		// pose = [x,y,z,g]'; siendo g el indice de configuracion.

		// Parametros del doble pendulo
		var a1 = this.largoEslabon1; //[m]
		var a2 = this.largoEslabon2; //[m]

		var c2 = (x*x + y*y -a1*a1 -a2*a2)/(2*a1*a2);

		var t1 = undefined;
		var t2 = undefined;

		if( math.abs(c2) <= 1){
			var s2 = g*math.sqrt(1-c2*c2);
			t2 = math.atan2(s2,c2);

			var factor = (a2*s2)/(a1 + a2*c2);
			var s1 = (y - x*factor)/((a1 + a2*c2) - factor*(a2*s2));
			var c1 = (x/(a1 + a2*c2)) + s1*factor;
			t1 = math.atan2(s1,c1);
		}

		return {
			't1' : t1,
			't2' : t2
		};
	};

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
