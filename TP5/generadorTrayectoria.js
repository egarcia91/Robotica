(function(){
	function GeneradorTrayectoria(div,config){

		this.scara = new Scara();
		for(var i = 0, elemento; elemento = this.lista[i]; i++){
			for(var j = 0, motor; motor = this.motores[j]; j++){
				this["trayectoria"+elemento+"motor"+motor] = new window["Trayectoria"+elemento](null,{});
			}
		}

	}

	GeneradorTrayectoria.prototype.constructor = "GeneradorTrayectoria";
	GeneradorTrayectoria.prototype.tiempoMuestreo = 1e-3;
	GeneradorTrayectoria.prototype.diccionarioThetas = {};

	GeneradorTrayectoria.prototype.lista = [
		"Ideal",
		"Real"
	];

	GeneradorTrayectoria.prototype.motores = [
		"1",
		"2"
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

	GeneradorTrayectoria.prototype.sumarSegmentos = function(segmento1, segmento2, data, motor){

		var nuevoSegmento = {
			posIni : segmento1.posIni,
			posFin : segmento2.posFin,
			t : (segmento1.t + segmento2.t),
			vel : segmento1.vel
		}

		if(math.abs(segmento1.t - data.tiempoAceleracion) < 1e-3){
			var vMaxM = data["velocidadMotor"+motor];
			var tiempoNuevoSegmento = math.abs(nuevoSegmento.posFin - nuevoSegmento.posIni)/vMaxM;
			var tiempoSegmento = math.max(tiempoNuevoSegmento, data.tiempoAceleracion);
			nuevoSegmento.t = tiempoSegmento;
			nuevoSegmento.vel = (nuevoSegmento.posFin - nuevoSegmento.posIni)/tiempoSegmento;
		}

		return nuevoSegmento;
	};

	GeneradorTrayectoria.prototype.comprimirSegmentos = function(data){
		var vel1Anterior = 0;
		var vel2Anterior = 0;
		var coincidencia = false;
		var coincidenciaAnterior = false;

		for(var i = 1, mot1, mot2; (mot1 = this.motor1[i]) != undefined &&  (mot2 = this.motor2[i]) != undefined; i++){
			if((math.abs(this.motor1[i-1].vel-this.motor1[i].vel) < 1e-1) && (math.abs(this.motor2[i-1].vel-this.motor2[i].vel) < 1e-1)){
				if(coincidenciaAnterior){
					if((math.abs(vel1Anterior - this.motor1[i].vel) < 1e-1) && (math.abs(vel2Anterior-this.motor2[i].vel) < 1e-1)){
						coincidencia = true;
						break;
					}
					coincidenciaAnterior = false;
				} else {
					coincidenciaAnterior = true;
					vel1Anterior = this.motor1[i-1].vel;
					vel2Anterior = this.motor2[i-1].vel;
				}
			}
		}
		if(coincidencia){
			var segmentoUnido1 = this.sumarSegmentos(this.motor1[i-1],this.motor1[i],data,"1");
			this.motor1.splice(i-1,2,segmentoUnido1);
			var segmentoUnido2 = this.sumarSegmentos(this.motor2[i-1],this.motor2[i],data,"2");
			this.motor2.splice(i-1,2,segmentoUnido2);
			this.comprimirSegmentos(data);
		}
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
//			var tiempoSegmento = math.max(tiempoSeg1, tiempoSeg2);
			var tiempoSegmento = math.max(tiempoSeg1, tiempoSeg2, data.tiempoAceleracion);
			var motor1 = {
				posIni : listaTheta1[i-1],
				posFin : listaTheta1[i],
				t : tiempoSegmento,
				vel : (listaTheta1[i] - listaTheta1[i-1])/tiempoSegmento
			};
			this.motor1.push(motor1);

			var motor2 = {
				posIni : listaTheta2[i-1],
				posFin : listaTheta2[i],
				t : tiempoSegmento,
				vel : (listaTheta2[i] - listaTheta2[i-1])/tiempoSegmento
			};
			this.motor2.push(motor2);
		}
	};

	GeneradorTrayectoria.prototype.generar = function(data){

		this.trayectoria = {};
		//Antes transformar los datos!!!

		this.motor1 = [];
		this.motor2 = [];
		this.calculoTiempo(data, 0, data.cantidadSegmentos);
		this.comprimirSegmentos(data);

		var dataMotores = {};
		for(var j = 0, motor; motor = this.motores[j]; j++){
			dataMotores["motor"+motor] = JSON.parse(JSON.stringify(data));
			dataMotores["motor"+motor].posiciones = this["motor"+motor];
		}

		for(var j = 0, motor; motor = this.motores[j]; j++){
			this.trayectoria["motor"+motor] = {};
			for(var i = 0, elemento; elemento = this.lista[i]; i++){
				this["trayectoria"+elemento+"motor"+motor].calcular(dataMotores["motor"+motor]);
				this.trayectoria["motor"+motor][elemento] = this["trayectoria"+elemento+"motor"+motor].resultados(this.tiempoMuestreo);
			}
		}

		return JSON.parse(JSON.stringify(this.trayectoria));
	};

	window.GeneradorTrayectoria = GeneradorTrayectoria;
})();
