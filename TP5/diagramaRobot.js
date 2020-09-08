(function(){
	function DiagramaRobot(div,config){

		this.scara = new Scara(undefined,{});
		//Generador Trayectoria
		//
		this.generadorTrayectoria = new GeneradorTrayectoria(undefined,{});

		this.controlPD = new ControlPD();
		this.controlPDPesoPropio = new ControlPDPesoPropio();
		this.controlTorqueComputado = new ControlTorqueComputado();

		//Control
		//
		//Actuador
		//
		//Planta Robot
		//
		//Sensor
		//
		//

	}

	DiagramaRobot.prototype.constructor = "DiagramaRobot";

	DiagramaRobot.prototype.getTrayectoria = function(){
		return this.deseado || {};
	};

	DiagramaRobot.prototype.definirConstantesControl = function(){
	};

	DiagramaRobot.prototype.ejecutar = function(data){

		this.control = this["control"+data.control];
		var ecuDiferencial = new odex.Solver(4); //cantidad variables independientes 4
		ecuDiferencial.absoluteTolerance = 0.001;
		ecuDiferencial.relativeTolerance = 0.001;
		ecuDiferencial.maxStepSize = data.tiempoMuestreo/5;
		ecuDiferencial.initialStepSize = data.tiempoMuestreo/10;

		var constantesControl = this.scara.constantesControl(data.motor);

		this.deseado = this.generadorTrayectoria.generar(data); //Posion, vel, Acel deseados. MOVEL

		var theta = [
			[ this.deseado.motor1[0], this.deseado.motor2[0], 0, 0 ]
		];

		for(var i = 0, thetaD1, thetaD2; ((thetaD1 = this.deseado.motor1[i]) != undefined) && ((thetaD2 = this.deseado.motor2[i]) != undefined); i++){
			var thetaD1p = this.deseado["motor1."][i];
			var thetaD2p = this.deseado["motor2."][i];
			var thetaD1pp = this.deseado["motor1.."][i];
			var thetaD2pp = this.deseado["motor2.."][i];
			var control = this.control.accionar(thetaD1, thetaD2, constantesControl, theta[i], this.scara.matrizDinamica(), thetaD1p, thetaD2p, thetaD1pp, thetaD2pp);

			var nuevaTheta = ecuDiferencial.solve(this.scara.modeloDinamico(data.motor, control), 0, theta[i], data.tiempoMuestreo).y;
			theta.push(nuevaTheta);
		}

		this.deseado['Xgraf'] = {'Real' : [], 'Ideal' : []};
		this.deseado['Ygraf'] = {'Real' : [], 'Ideal' : []};

		for(var i = 0, the; (the = theta[i])!= undefined; i++){
			this.deseado.motor1[i] = the[0];
			this.deseado.motor2[i] = the[1];
			var resMatriz = this.scara.problemaDirecto(the[0],the[1]);
			this.deseado['Xgraf']['Real'].push({ 'posicion' : resMatriz[0][3] });
			if(this.deseado['X']['Real'][i]){
				this.deseado['Xgraf']['Ideal'].push({ 'posicion' : this.deseado['X']['Real'][i].posicion });
			} else {
				this.deseado['Xgraf']['Ideal'].push({ 'posicion' : this.deseado['X']['Real'][i-1].posicion });
			}
			this.deseado['Ygraf']['Real'].push({ 'posicion' : resMatriz[1][3] });
			if(this.deseado['Y']['Real'][i]){
				this.deseado['Ygraf']['Ideal'].push({ 'posicion' : this.deseado['Y']['Real'][i].posicion });
			} else {
				this.deseado['Ygraf']['Ideal'].push({ 'posicion' : this.deseado['Y']['Real'][i-1].posicion });
			}
		}

		//Estructura real
		//Conseguir el tiempo total
		//hacer un while iterando por todos los segmentos
		//hacer un MOVE L o lo que fuere para moverse dentro de eso
		//accion de control
		//etc....
	};


	window.DiagramaRobot = DiagramaRobot;
})();
