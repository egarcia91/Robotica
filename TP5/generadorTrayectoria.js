(function(){
	function GeneradorTrayectoria(div,config){

		for(var i = 0, elemento; elemento = this.lista[i]; i++){
			this["trayectoria"+elemento] = new window["Trayectoria"+elemento](null,{});
		}

	}

	GeneradorTrayectoria.prototype.constructor = "GeneradorTrayectoria";
	GeneradorTrayectoria.prototype.largoEslabon1 = 400;
	GeneradorTrayectoria.prototype.largoEslabon2 = 300;
	GeneradorTrayectoria.prototype.tiempoMuestreo = 1e-3;

	GeneradorTrayectoria.prototype.lista = [
		"Ideal",
		"Real"
	];

	GeneradorTrayectoria.prototype.transformacion = function(x, y, z, g){
		// pose = [x,y,z,g]'; siendo g el indice de configuracion.

		// Parametros del doble pendulo
		var a1 = this.largoEslabon1; //[mm]
		var a2 = this.largoEslabon2; //[mm]

		var c2 = (x*x + y*y -a1*a1 -a2*a2)/(2*a1*a2);

		var theta1 = undefined;
		var theta2 = undefined;

		if( math.abs(c2) <= 1){
			var s2 = g*math.sqrt(1-c2*c2);
			theta2 = math.atan2(s2,c2);

			//A x = b

			//|a1+a2.c2 -a2.s2   | |c1|   | x |
			//|a2.s2     a1+a2.c2| |s1| = | y |
			
			var factor = (a2*s2)/(a1 + a2*c2);
			var s1 = (y - x*factor)/((a1 + a2*c2) - factor*(a2*s2));
			var c1 = (x/(a1 + a2*c2)) + s1*factor;
			theta1 = math.atan2(s1,c1);
		}

		return {
			'theta1' : theta1,
			'theta2' : theta2
		};
	};

	GeneradorTrayectoria.prototype._PODER_VER_THETA1_THETA2_FUNCION_TIEMPO = function(data){
		this.cantidadEquiespacios = data.cantidadSegmentos+1;
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
			var res = this.transformacion(posicionX, data.posiciones[0].posIni.Y, 0, -1);
			theta1.push(res.theta1);
			theta2.push(res.theta2);
			var tiempoSegmento = 0;
			if(theta1[i-1] != undefined){
				var tiempoSeg1 = math.abs(theta1[i-1] - theta1[i])/vMaxM1;
				var tiempoSeg2 = math.abs(theta2[i-1] - theta2[i])/vMaxM2;
				//console.log("Tiempo segmento motor 1: "+math.abs(theta1[i-1] - theta1[i])/vMaxM1+" Tiempo segmento motor 2: "+math.abs(theta2[i-1] - theta2[i])/vMaxM2);
				if(tiempoSeg1 > tiempoSeg2){
					tiempoSegmento = tiempoSeg1;
					tiempoTotal += tiempoSeg1;
				} else {
					tiempoSegmento = -tiempoSeg2;
					tiempoTotal += tiempoSeg2;
				}
				var resultado = {
					posIni : theta1[i-1],
					posFin : theta1[i],
					t : tiempoSegmento,
					vel : (theta1[i] - theta1[i-1])/tiempoSegmento
				};

				dataNueva.push(resultado);
			}

//			var resultado = {
//				posicion : tiempoSegmento,
//				velocidad : res.theta1*180/math.PI,
//				aceleracion : res.theta2*180/math.PI,
//				tiempo : t[i]
//			};

		}
//		console.log(tiempoTotal);

//		return trayectoria;
		return dataNueva;

	};

	GeneradorTrayectoria.prototype.generar = function(data){

		this.trayectoria = {};
		//Antes transformar los datos!!!

		//this.trayectoria = this._PODER_VER_THETA1_THETA2_FUNCION_TIEMPO(data);
		data.posiciones = this._PODER_VER_THETA1_THETA2_FUNCION_TIEMPO(data);
		for(var i = 0, elemento; elemento = this.lista[i]; i++){
			this["trayectoria"+elemento].calcular(data);
			this.trayectoria[elemento] = this["trayectoria"+elemento].resultados(this.cantidadEquiespacios*100);
		}

		return JSON.parse(JSON.stringify(this.trayectoria));
	};

	window.GeneradorTrayectoria = GeneradorTrayectoria;
})();
