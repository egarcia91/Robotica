(function(){
	function GeneradorTrayectoria(div,config){

		this.scara = new Scara();
		for(var i = 0, elemento; elemento = this.lista[i]; i++){
			this["trayectoria"+elemento] = new window["Trayectoria"+elemento](null,{});
		}

	}

	GeneradorTrayectoria.prototype.constructor = "GeneradorTrayectoria";
	GeneradorTrayectoria.prototype.tiempoMuestreo = 1e-3;
	GeneradorTrayectoria.prototype.diccionarioThetas = {};

	GeneradorTrayectoria.prototype.lista = [
		"Ideal",
		"Real"
	];

	GeneradorTrayectoria.prototype._CALCULAR_TIEMPO = function(data, cantidad, indice){
		var posicionesX = linspace(data.posiciones[indice].posIni.X, data.posiciones[indice].posFin.X, cantidad);
		var posicionesY = linspace(data.posiciones[indice].posIni.Y, data.posiciones[indice].posFin.Y, cantidad);
		var vMaxM1 = data.velocidadMotor1;
		var vMaxM2 = data.velocidadMotor2;
		this.listaTheta1 = [];
		this.listaTheta2 = [];

		var tiempoTotal = 0;

		for(var i = 0, posicionX, posicionY; (posicionX = posicionesX[i]) != undefined && (posicionY = posicionesY[i]) != undefined; i++){
			var indiceX = posicionX.toFixed(9);
			var indiceY = posicionY.toFixed(9);

			if(this.diccionarioThetas[indiceX]){
				if(!this.diccionarioThetas[indiceX][indiceY]){
					this.diccionarioThetas[indiceX][indiceY] = this.scara.problemaInverso(posicionX, posicionY, 0, -1);
				}
			} else {
				this.diccionarioThetas[indiceX] = {};
				this.diccionarioThetas[indiceX][indiceY] = this.scara.problemaInverso(posicionX, posicionY, 0, -1);
			}

			this.listaTheta1.push(this.diccionarioThetas[indiceX][indiceY].theta1);
			this.listaTheta2.push(this.diccionarioThetas[indiceX][indiceY].theta2);

			var tiempoSegmento = 0;
			if(this.listaTheta1[i-1] != undefined){
				var tiempoSeg1 = math.abs(this.listaTheta1[i-1] - this.listaTheta1[i])/vMaxM1;
				var tiempoSeg2 = math.abs(this.listaTheta2[i-1] - this.listaTheta2[i])/vMaxM2;
				tiempoSegmento = math.max(tiempoSeg1, tiempoSeg2);
				//tiempoSegmento = math.max(tiempoSeg1, tiempoSeg2, data.tiempoAceleracion);
				tiempoTotal += tiempoSegmento;
			}
		}

		return tiempoTotal;
	};

	GeneradorTrayectoria.prototype.armarSegmentos = function(data, cantidad){
		this.cantidadEquiespacios = cantidad;

		//Antes transformar los datos!!!

		var vMaxM1 = data.velocidadMotor1;
		var vMaxM2 = data.velocidadMotor2;

		var dataNueva = [];
		var salteoPosible = false;
		var j = 0;
		var tolerancia = 5e-4;

		for(var i = 1, theta1, theta2; (theta1 = this.listaTheta1[i]) != undefined &&  (theta2 = this.listaTheta2[i]) != undefined; i++){
			if(!salteoPosible){
				j = i-1;
			} else {
			}

			var diff1 = math.abs(this.listaTheta1[j] - this.listaTheta1[i]);
			var diff2 = math.abs(this.listaTheta2[j] - this.listaTheta2[i]);
			if( (diff1 < tolerancia) && (diff2 < tolerancia) ){
				salteoPosible = true;
			} else {
				salteoPosible = false;
				var tiempoSegmento = 0;
				var tiempoSeg1 = math.abs(this.listaTheta1[j] - this.listaTheta1[i])/vMaxM1;
				var tiempoSeg2 = math.abs(this.listaTheta2[j] - this.listaTheta2[i])/vMaxM2;
				tiempoSegmento = math.max(tiempoSeg1, tiempoSeg2, data.tiempoAceleracion);
				var resultado = {
					posIni : this.listaTheta1[j],
					posFin : this.listaTheta1[i],
					t : tiempoSegmento,
					vel : (this.listaTheta1[i] - this.listaTheta1[j])/tiempoSegmento
				};
				dataNueva.push(resultado);
			}
		}
		return dataNueva;

//		var posicionesX = linspace(data.posiciones[0].posIni.X, data.posiciones[0].posFin.X, this.cantidadEquiespacios);
//		var posicionesY = linspace(data.posiciones[0].posIni.Y, data.posiciones[0].posFin.Y, this.cantidadEquiespacios);
//		var theta1 = [];
//		var theta2 = [];
//

//		var tiempoTotal = 0;
//
//
//		for(var i = 0, posicionX, posicionY; (posicionX = posicionesX[i]) != undefined && (posicionY = posicionesY[i]) != undefined; i++){
////			var res = this.scara.problemaInverso(posicionX, posicionY, 0, -1);
////			theta1.push(res.theta1);
////			theta2.push(res.theta2);
////			var tiempoSegmento = 0;
////			if(theta1[i-1] != undefined){
////				var tiempoSeg1 = math.abs(theta1[i-1] - theta1[i])/vMaxM1;
////				var tiempoSeg2 = math.abs(theta2[i-1] - theta2[i])/vMaxM2;
////				tiempoSegmento = math.max(tiempoSeg1, tiempoSeg2);
////				//tiempoSegmento = math.max(tiempoSeg1, tiempoSeg2, data.tiempoAceleracion);
////				tiempoTotal += tiempoSegmento;
////				var resultado = {
////					posIni : theta2[i-1],
////					posFin : theta2[i],
////					t : tiempoSegmento,
////					vel : (theta2[i] - theta2[i-1])/tiempoSegmento
////				};
////				dataNueva.push(resultado);
////			}
//		}

//		console.log(tiempoTotal);
//		return dataNueva;

	};

	GeneradorTrayectoria.prototype.calculoTiempo = function(data, indice, cantidad){

		this.iter++;
		var valor1 = this._CALCULAR_TIEMPO(data, cantidad, indice);
		var valor2 = this._CALCULAR_TIEMPO(data, cantidad*10, indice);
		if(this.iter == 5){
			console.log("ERROR Muchas iteraciones en metodo recursivo");
			return 0;
		}
		if(math.abs(valor1 - valor2) > 1e-3){
			return this.calculoTiempo(data, indice, cantidad*10);
		}

		return cantidad;
	};

	GeneradorTrayectoria.prototype.generar = function(data){

		this.trayectoria = {};
		//Antes transformar los datos!!!
		this.iter = 0;
		this.listaTheta1 = [];
		this.listaTheta2 = [];

		var mejorEstimacionCantidad = this.calculoTiempo(data, 0, data.cantidadSegmentos);
		data.posiciones = this.armarSegmentos(data, mejorEstimacionCantidad);
		console.log(data.posiciones.length);
		//this.trayectoria = this.armarSegmentos(data);
		for(var i = 0, elemento; elemento = this.lista[i]; i++){
			this["trayectoria"+elemento].calcular(data);
			this.trayectoria[elemento] = this["trayectoria"+elemento].resultados(this.pasosGrafico);
		}

		return JSON.parse(JSON.stringify(this.trayectoria));
	};

	window.GeneradorTrayectoria = GeneradorTrayectoria;
})();
