(function(){
	function DiagramaRobot(div,config){

		this.scara = new Scara(undefined,{});
		//Generador Trayectoria
		//
		this.generadorTrayectoria = new GeneradorTrayectoria(undefined,{});

		this.control = new ControlPD();

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

		this.scara.actualizarFrecuencia(data.tiempoMuestreo);
		var constantesControl = this.scara.constantesControl();

		this.deseado = this.generadorTrayectoria.generar(data); //Posion, vel, Acel deseados. MOVEL

		var theta = [{
			1 : 0,
			2 : 0
		}];

		var thetap = [{
			1 : 0,
			2 : 0
		}];

		var control = this.control.accionar(this.deseado.motor1[0], this.deseado.motor2[0], constantesControl, theta[0], thetap[0]);

		this.scara.modeloDinamico(0, theta[0], thetap[0], control);

		//Estructura real
		//Conseguir el tiempo total
		//hacer un while iterando por todos los segmentos
		//hacer un MOVE L o lo que fuere para moverse dentro de eso
		//accion de control
		//etc....
	};


	window.DiagramaRobot = DiagramaRobot;
})();
