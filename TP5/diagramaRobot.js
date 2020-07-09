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
		this.generadorTrayectoria.generar(data);
		this.generadorTrayectoria.resultados();

	};

	window.DiagramaRobot = DiagramaRobot;
})();


