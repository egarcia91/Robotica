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

	DiagramaRobot.prototype.ejecutar = function(data){

		console.log(this.generadorTrayectoria.generar(data)); //Posion, vel, Acel deseados.

	};

	window.DiagramaRobot = DiagramaRobot;
})();


