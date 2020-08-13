(function(){
	function DiagramaRobot(div,config){

		this.scara = new Scara(undefined,{});
		//Generador Trayectoria
		//
		this.generadorTrayectoria = new GeneradorTrayectoria(undefined,{});

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

	DiagramaRobot.prototype.ejecutar = function(data){

		this.deseado = this.generadorTrayectoria.generar(data); //Posion, vel, Acel deseados. MOVEL

		//Estructura real
		//Conseguir el tiempo total
		//hacer un while iterando por todos los segmentos
		//hacer un MOVE L o lo que fuere para moverse dentro de eso
		//accion de control
		//etc....
		this.scara.actualizarFrecuencia(data.tiempoMuestreo);

	};

	window.DiagramaRobot = DiagramaRobot;
})();
