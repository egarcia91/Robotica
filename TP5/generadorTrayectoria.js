(function(){
	function GeneradorTrayectoria(div,config){

		this.scara = new Scara();
		for(var i = 0, elemento; elemento = this.lista[i]; i++){
			this["trayectoria"+elemento] = new window["Trayectoria"+elemento](null,{});
		}

	}

	GeneradorTrayectoria.prototype.constructor = "GeneradorTrayectoria";
	GeneradorTrayectoria.prototype.tiempoMuestreo = 1e-3;

	GeneradorTrayectoria.prototype.lista = [
		"Ideal",
		"Real"
	];

	GeneradorTrayectoria.prototype._PODER_VER_THETA1_THETA2_FUNCION_TIEMPO = function(data){
		this.cantidadEquiespacios = data.cantidadSegmentos+1;
		this.pasosGrafico = data.pasosGrafico;
		trayectoria = {};
		//Antes transformar los datos!!!
		//
		var posicionesX = linspace(data.posiciones[0].posIni.X, data.posiciones[0].posFin.X, this.cantidadEquiespacios);
		var theta1 = [];
		var theta2 = [];
		trayectoria.Ideal = [];

		var vMaxM1 = data.velocidadMotor1;
		var vMaxM2 = data.velocidadMotor2;

		var tiempoTotal = 0;

		var dataNueva = [];

		for(var i = 0, posicionX; (posicionX = posicionesX[i]) != undefined; i++){
			var res = this.scara.problemaInverso(posicionX, data.posiciones[0].posIni.Y, 0, -1);
			theta1.push(res.theta1);
			theta2.push(res.theta2);
			var tiempoSegmento = 0;
			if(theta1[i-1] != undefined){
				var tiempoSeg1 = math.abs(theta1[i-1] - theta1[i])/vMaxM1;
				var tiempoSeg2 = math.abs(theta2[i-1] - theta2[i])/vMaxM2;
				tiempoSegmento = math.max(tiempoSeg1, tiempoSeg2, data.tiempoAceleracion);
				tiempoTotal += tiempoSegmento;
				var resultado = {
					posIni : theta2[i-1],
					posFin : theta2[i],
					t : tiempoSegmento,
					vel : (theta2[i] - theta2[i-1])/tiempoSegmento
				};
				dataNueva.push(resultado);
			}
		}

		console.log(tiempoTotal);
		return dataNueva;

	};

	GeneradorTrayectoria.prototype.generar = function(data){

		this.trayectoria = {};
		//Antes transformar los datos!!!

		//this.trayectoria = this._PODER_VER_THETA1_THETA2_FUNCION_TIEMPO(data);
		data.posiciones = this._PODER_VER_THETA1_THETA2_FUNCION_TIEMPO(data);
//		for(var i = 0, elemento; elemento = this.lista[i]; i++){
//			this["trayectoria"+elemento].calcular(data);
//			this.trayectoria[elemento] = this["trayectoria"+elemento].resultados(this.cantidadEquiespacios*this.pasosGrafico);
//		}

		return JSON.parse(JSON.stringify(this.trayectoria));
	};

	window.GeneradorTrayectoria = GeneradorTrayectoria;
})();
