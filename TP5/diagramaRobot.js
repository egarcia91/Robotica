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

	DiagramaRobot.prototype.tipos = [
		"Ideal",
		"Real"
	];

	DiagramaRobot.prototype.tipoTrayectorias = [
		"posicion",
		"velocidad",
		"aceleracion"
	];

	DiagramaRobot.prototype.motorTrayectorias = [
		"angulo",
		"velocidadAngular",
		"aceleracionAngular"
	];

	DiagramaRobot.prototype.motorTerminologia = [
		"",
		".",
		".."
	];


	DiagramaRobot.prototype.resultados = {
		calculado : false,
		trayectorias : {
			posicion : {
				ideal : [],
				real : []
			},
			velocidad : {
				ideal : [],
				real : []
			},
			aceleracion : {
				ideal : [],
				real : []
			}
		},
		motores : {
			angulo : {
				real : []
			},
			velocidadAngular : {
				real : []
			},
			aceleracionAngular : {
				real : []
			}
		},
		fuerzas : {
		},
		distanciaTrayectorias : {
		},
		tiempo : []
	}

	DiagramaRobot.prototype.nodoTrayectoria = function(x, y){

		var nodotrayectoria = {
			x : x,
			y : y
		};

		return nodotrayectoria;
	};

	DiagramaRobot.prototype.nodoTheta = function(t1, t2){

		var nodotheta = {
			t1 : t1,
			t2 : t2
		};

		return nodotheta;
	};

	DiagramaRobot.prototype.nodoDistancia = function(xReal, yReal){

		var nodoDistancia = {
			xr : xReal,
			yr : yReal
		};

		return nodoDistancia;
	};

	DiagramaRobot.prototype.nodoFuerza = function(u1, u2){

		var nodofuerza = {
			u1 : u1,
			u2 : u2
		};

		return nodofuerza;
	};

	DiagramaRobot.prototype.getTrayectoria = function(){
		return this.resultados || {};
	};

	DiagramaRobot.prototype.prepararSolver = function(tiempoMuestreo){
		var ecuDiferencial = new odex.Solver(4); //cantidad variables independientes 4
		ecuDiferencial.absoluteTolerance = 0.001;
		ecuDiferencial.relativeTolerance = 0.001;
		ecuDiferencial.maxStepSize = tiempoMuestreo/5;
		ecuDiferencial.initialStepSize = tiempoMuestreo/10;

		return ecuDiferencial;
	};

	DiagramaRobot.prototype.datosMejorar = function(theta){
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


	};

	DiagramaRobot.prototype.parseoTrayectoria = function(data){

		if(this.resultados.calculado){
			return;
		}

		var resultado = this.generadorTrayectoria.generar(data); //Posion, vel, Acel deseados. MOVEL
		var tiempoCopiado = false;
		var tiempo = [];
		for(var h = 0, trayectoria; trayectoria = this.tipoTrayectorias[h]; h++){
			for(var j = 0, tipo; tipo = this.tipos[j]; j++){
				for(var i = 0, xi, yi; ((xi = resultado['X'][tipo][i]) != undefined) && ((yi = resultado['Y'][tipo][i]) != undefined); i++){
					this.resultados.trayectorias[trayectoria][tipo.toLowerCase()].push(this.nodoTrayectoria(xi[trayectoria],yi[trayectoria]));
					if(!tiempoCopiado){
						tiempo.push(xi.tiempo);
					}
				}
				tiempoCopiado = true;
			}

			var term = this.motorTerminologia[h];
			var mortorTray = this.motorTrayectorias[h];
			for(var i = 0, t1, t2; ((t1 = resultado['motor1'+term][i]) != undefined) && ((t2 = resultado['motor2'+term][i]) != undefined); i++){
				this.resultados.motores[mortorTray]['real'].push(this.nodoTheta(t1,t2));
			}
		}

		this.resultados.calculado = true;
		this.resultados.tiempo = tiempo;

	};

	DiagramaRobot.prototype.ordernarThetas = function(thetas, control, motor){
		var controlAplicado = "Control"+control;
		var motorUtilizado = "U9D-"+motor;
		thetas.pop(); //siempre me sobra un valor!
		var pri = this.motorTrayectorias[0];
		var sec = this.motorTrayectorias[1];
		var str = controlAplicado+"--"+motorUtilizado;

		this.resultados.motores[pri][str] = [];
		this.resultados.motores[sec][str] = [];
		this.resultados.trayectorias.posicion[str] = [];
		this.resultados.trayectorias.posicion[str] = [];
		this.resultados.distanciaTrayectorias[str] = [];

		for(var i = 0, theta; theta = thetas[i]; i++){

			//var idealComparar = this.resultados.trayectorias.posicion.ideal[i];
			var realComparar = this.resultados.trayectorias.posicion.real[i];
			var resMatriz = this.scara.problemaDirecto(theta[0],theta[1]);
			var x = resMatriz[0][3];
			var y = resMatriz[1][3];
			var nodoTray = this.nodoTrayectoria(x,y);
			//var xIdeal = math.abs(idealComparar.x - x);
			var xReal = math.abs(realComparar.x - x);
			//var yIdeal = math.abs(idealComparar.y - y);
			var yReal = math.abs(realComparar.y - y);
			var nodoDistancia = this.nodoDistancia(xReal, yReal);

			var nodoAngulo = this.nodoTheta(theta[0],theta[1]);
			var nodoVelocidadAngular = this.nodoTheta(theta[2],theta[3]);
			this.resultados.motores[pri][str].push(nodoAngulo);
			this.resultados.motores[sec][str].push(nodoVelocidadAngular);
			this.resultados.trayectorias.posicion[str].push(nodoTray);
			this.resultados.distanciaTrayectorias[str].push(nodoDistancia);
		}

	};

	DiagramaRobot.prototype.ordernarFuerzas = function(fuerzas, control, motor){
		var controlAplicado = "Control"+control;
		var motorUtilizado = "U9D-"+motor;
		this.resultados.fuerzas[controlAplicado+"--"+motorUtilizado] = JSON.parse(JSON.stringify(fuerzas));
	};

	DiagramaRobot.prototype.getMotor = function(numero, posicion, terminologia){
		var term = terminologia || "";
		var index = this.motorTerminologia.indexOf(term);
		var motorTray = this.motorTrayectorias[index];
		var aux = this.resultados.motores[motorTray].real[posicion];
		if(aux){
			return aux["t"+numero];
		} else {
			return undefined;
		}
	};

	DiagramaRobot.prototype.posicionInicial = function(){

		var angulo = this.resultados.motores.angulo.real;
		var velocidadAngular = this.resultados.motores.velocidadAngular.real;
		var theta = [
			angulo[0].t1,
			angulo[0].t2,
			velocidadAngular[0].t1,
			velocidadAngular[0].t2
		];

		return theta;
	};

	DiagramaRobot.prototype.ejecutar = function(data){

		var ecuDiferencial = this.prepararSolver(data.tiempoMuestreo); //cantidad variables independientes 4

		this.control = this["control"+data.control];
		var constantesControl = this.scara.constantesControl(data.motor);

		this.parseoTrayectoria(data);
//		this.deseado = this.generadorTrayectoria.generar(data); //Posion, vel, Acel deseados. MOVEL

		var thetas = [];
		thetas.push(this.posicionInicial());

		var fuerzas = [];

		for(var i = 0, thetaD1, thetaD2; ((thetaD1 = this.getMotor("1",i)) != undefined) && ((thetaD2 = this.getMotor("2",i)) != undefined); i++){
			var thetaD1p = this.getMotor("1",i,".");
			var thetaD2p = this.getMotor("2",i,".");
			var thetaD1pp = this.getMotor("1",i,"..");
			var thetaD2pp = this.getMotor("2",i,"..");

			var control = this.control.accionar(thetaD1, thetaD2, constantesControl, thetas[i], this.scara.matrizDinamica(), thetaD1p, thetaD2p, thetaD1pp, thetaD2pp);

			fuerzas.push(control);
			var nuevaTheta = ecuDiferencial.solve(this.scara.modeloDinamico(data.motor, control), 0, thetas[i], data.tiempoMuestreo).y;
			thetas.push(nuevaTheta);
		}

		this.ordernarFuerzas(fuerzas, data.control, data.motor);
		this.ordernarThetas(thetas, data.control, data.motor);

//		this.datosMejorar(theta);
//
//		console.log(this.deseado);

		//Estructura real
		//Conseguir el tiempo total
		//hacer un while iterando por todos los segmentos
		//hacer un MOVE L o lo que fuere para moverse dentro de eso
		//accion de control
		//etc....
	};


	window.DiagramaRobot = DiagramaRobot;
})();
