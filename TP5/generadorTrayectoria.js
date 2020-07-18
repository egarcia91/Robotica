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

	GeneradorTrayectoria.prototype.calculoIntervalo = function(data, cantidad, indice){
		var posicionesX = linspace(data.posiciones[indice].posIni.X, data.posiciones[indice].posFin.X, cantidad);
		var posicionesY = linspace(data.posiciones[indice].posIni.Y, data.posiciones[indice].posFin.Y, cantidad);
		var vMaxM1 = data.velocidadMotor1;
		var vMaxM2 = data.velocidadMotor2;
		var listaTheta1 = [];
		var listaTheta2 = [];

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

			listaTheta1.push(this.diccionarioThetas[indiceX][indiceY].theta1);
			listaTheta2.push(this.diccionarioThetas[indiceX][indiceY].theta2);

			var tiempoSegmento = 0;
			if(listaTheta1[i-1] != undefined){
				var tiempoSeg1 = math.abs(listaTheta1[i-1] - listaTheta1[i])/vMaxM1;
				var tiempoSeg2 = math.abs(listaTheta2[i-1] - listaTheta2[i])/vMaxM2;
				tiempoSegmento = math.max(tiempoSeg1, tiempoSeg2);
				//tiempoSegmento = math.max(tiempoSeg1, tiempoSeg2, data.tiempoAceleracion);
				tiempoTotal += tiempoSegmento;
			}
		}

		return {
			tiempo : tiempoTotal,
			listaTheta1 : listaTheta1,
			listaTheta2 : listaTheta2
		}
	};

	GeneradorTrayectoria.prototype.calculoTiempo = function(data, indice, cantidad){

		var valor = 0;
		var res1 = this.calculoIntervalo(data, cantidad, indice);
		var res2 = this.calculoIntervalo(data, cantidad+2, indice);
		var valor1 = res1.tiempo;
		var valor2 = res2.tiempo;

		if(math.abs(valor1 - valor2) > 1e-3){
			if(cantidad == 1){
				cantidad = 16; //FIXME desharcodear en algun momento
			}

			var cantidadMitad = parseInt(cantidad/2,10);

			var posicionIniY = data.posiciones[indice].posIni.Y;
			var mitadPosicionY = (data.posiciones[indice].posFin.Y - posicionIniY)/2 + posicionIniY;

			var posicionIniX = data.posiciones[indice].posIni.X;
			var mitadPosicionX = (data.posiciones[indice].posFin.X - posicionIniX)/2 + posicionIniX;
			var primerMitadData = JSON.parse(JSON.stringify(data));
			primerMitadData.posiciones[indice].posFin.X = mitadPosicionX;
			primerMitadData.posiciones[indice].posFin.Y = mitadPosicionY;
			var valorPrimerMitad = this.calculoTiempo(primerMitadData, indice, cantidadMitad);

			var segundaMitadData = JSON.parse(JSON.stringify(data));
			segundaMitadData.posiciones[indice].posIni.X = mitadPosicionX;
			segundaMitadData.posiciones[indice].posIni.Y = mitadPosicionY;
			var valorSegundaMitad = this.calculoTiempo(segundaMitadData, indice, cantidadMitad);

			valor = valorPrimerMitad + valorSegundaMitad;
		} else {
			valor = valor1;
			this.armarSegmentoIntervalo(res1.listaTheta1, res1.listaTheta2, data);
		}

		return valor;
	};

	GeneradorTrayectoria.prototype.armarSegmentoIntervalo = function(listaTheta1, listaTheta2, data){

		if(!listaTheta1.length || !listaTheta2.length){
			return;
		}

		var vMaxM1 = data.velocidadMotor1;
		var vMaxM2 = data.velocidadMotor2;

		for(var i = 1, theta1, theta2; (theta1 = listaTheta1[i]) != undefined &&  (theta2 = listaTheta2[i]) != undefined; i++){
			var tiempoSeg1 = math.abs(listaTheta1[i-1] - listaTheta1[i])/vMaxM1;
			var tiempoSeg2 = math.abs(listaTheta2[i-1] - listaTheta2[i])/vMaxM2;
			var tiempoSegmento = math.max(tiempoSeg1, tiempoSeg2);
			//var tiempoSegmento = math.max(tiempoSeg1, tiempoSeg2, data.tiempoAceleracion);
			var resultado = {
				posIni : listaTheta1[i-1],
				posFin : listaTheta1[i],
				t : tiempoSegmento,
				vel : (listaTheta1[i] - listaTheta1[i-1])/tiempoSegmento
			};
			this.dataNueva.push(resultado);
		}
	};

	GeneradorTrayectoria.prototype.generar = function(data){

		this.trayectoria = {};
		//Antes transformar los datos!!!

		this.dataNueva = [];
		console.log(this.calculoTiempo(data, 0, data.cantidadSegmentos));
		data.posiciones = this.dataNueva;

//		console.log(data);
//		//this.trayectoria = this.armarSegmentos(data);
		for(var i = 0, elemento; elemento = this.lista[i]; i++){
			this["trayectoria"+elemento].calcular(data);
			this.trayectoria[elemento] = this["trayectoria"+elemento].resultados(this.pasosGrafico);
		}

		return JSON.parse(JSON.stringify(this.trayectoria));
	};

	window.GeneradorTrayectoria = GeneradorTrayectoria;
})();
