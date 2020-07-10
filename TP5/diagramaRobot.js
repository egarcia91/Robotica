(function(){
	function DiagramaRobot(div,config){

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

		this.deseado = this.generadorTrayectoria.generar(data); //Posion, vel, Acel deseados.

	};

	window.DiagramaRobot = DiagramaRobot;
})();
