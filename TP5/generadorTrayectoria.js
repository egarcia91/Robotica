(function(){
	function GeneradorTrayectoria(div,config){

		this.scara = new Scara();
		for(var i = 0, tipo; tipo = this.tipos[i]; i++){
			for(var j = 0, ejeCartesiano; ejeCartesiano = this.ejesCartesianos[j]; j++){
				this["trayectoria"+tipo+ejeCartesiano] = new window["Trayectoria"+tipo](null,{});
			}
		}

	}

	GeneradorTrayectoria.prototype.constructor = "GeneradorTrayectoria";
	GeneradorTrayectoria.prototype.diccionarioThetas = {};

	GeneradorTrayectoria.prototype.tipos = [
		"Ideal",
		"Real"
	];

	GeneradorTrayectoria.prototype.ejesCartesianos = [
		"X",
		"Y"
	];

	GeneradorTrayectoria.prototype.motores = [
		"1",
		"2"
	];

	GeneradorTrayectoria.prototype.calculoDerivada = function(lista, tiempoMuestreo){
		var derivada = [0];

		for(var i = 1, elemento, elementoAnterior; ((elemento = lista[i]) != undefined) && ((elementoAnterior = lista[i-1]) != undefined); i++){
			derivada.push((elemento - elementoAnterior)/tiempoMuestreo)
		}

		return derivada;
	};

	GeneradorTrayectoria.prototype.calculoAnguloMotores = function(){
		var posicionesX = this.trayectoria["X"]["Real"];
		var posicionesY = this.trayectoria["Y"]["Real"];

		var listaTheta1 = [];
		var listaTheta2 = [];

		for(var i = 0, posicionX, posicionY; (posicionX = posicionesX[i]) != undefined && (posicionY = posicionesY[i]) != undefined; i++){

			var res = this.scara.problemaInverso(posicionX.posicion, posicionY.posicion, 0, -1);

			listaTheta1.push(res.theta1);
			listaTheta2.push(res.theta2);

		}

		return {
			listaTheta1 : listaTheta1,
			listaTheta2 : listaTheta2
		}
	};

	GeneradorTrayectoria.prototype.separacionVariables = function(data){
		var vMax = data.velocidadMotor1;
		var apartado = {};
		for(var j = 0, ejeCartesiano; ejeCartesiano = this.ejesCartesianos[j]; j++){
			apartado[ejeCartesiano] = {
				posiciones : [],
				tiempoAceleracion : data.tiempoAceleracion
			};
		}

		for(var i = 0, ele; ele = data.posiciones[i]; i++){
			var tiempos = {};

			for(var j = 0, ejeCartesiano; ejeCartesiano = this.ejesCartesianos[j]; j++){
				apartado[ejeCartesiano].posiciones.push({
					posFin : ele.posFin[ejeCartesiano],
					posIni : ele.posIni[ejeCartesiano],
					t : 0
				});
				tiempos[ejeCartesiano] = math.abs(ele.posFin[ejeCartesiano] - ele.posIni[ejeCartesiano])/vMax;

			}

			var tiempoSegmento = math.max(tiempos.X, tiempos.Y, data.tiempoAceleracion, ele.tiempoDeseado);

			for(var j = 0, ejeCartesiano; ejeCartesiano = this.ejesCartesianos[j]; j++){
				apartado[ejeCartesiano].posiciones[i].t = tiempoSegmento;
				apartado[ejeCartesiano].posiciones[i].vel = (ele.posFin[ejeCartesiano] - ele.posIni[ejeCartesiano])/tiempoSegmento;
			}
		}

		return apartado;
	};

	GeneradorTrayectoria.prototype.generar = function(data){

		this.trayectoria = {};
		var dataSeparada = this.separacionVariables(data);
		for(var j = 0, ejeCartesiano; ejeCartesiano = this.ejesCartesianos[j]; j++){
			this.trayectoria[ejeCartesiano] = {};
			for(var i = 0, tipo; tipo = this.tipos[i]; i++){
				this.trayectoria[ejeCartesiano][tipo];
				this["trayectoria"+tipo+ejeCartesiano].calcular(dataSeparada[ejeCartesiano]);
				this.trayectoria[ejeCartesiano][tipo] = this["trayectoria"+tipo+ejeCartesiano].resultados(data.tiempoMuestreo);
			}
		}

		var angulos = this.calculoAnguloMotores();
		for(var i = 0, motor; motor = this.motores[i]; i++){
			this.trayectoria["motor"+motor] = angulos["listaTheta"+motor];
			var derivada = this.calculoDerivada(angulos["listaTheta"+motor],data.tiempoMuestreo);
			this.trayectoria["motor"+motor+"."] = derivada;
			this.trayectoria["motor"+motor+".."] = this.calculoDerivada(derivada,data.tiempoMuestreo);
		}

		return JSON.parse(JSON.stringify(this.trayectoria));
	};

	window.GeneradorTrayectoria = GeneradorTrayectoria;
})();
