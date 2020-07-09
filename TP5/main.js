(function(){
	function Main(div,config){
		HtmlWidget.call(this,div,config);

		this.basicDraw();

		var divParametros = this.getElementsByClassName('parametros')[0];
		this.parametro = new Parametro(divParametros,{});
		this.parametro.addEventListener('calcule',this.onCalc.bind(this));

//		var divResultados = this.getElementsByClassName('resultados')[0];
//		this.resultado = new Resultado(divResultados,{});

		this.diagramaRobot = new DiagramaRobot(undefined,{});

		var divGraficos = this.getElementsByClassName('graficos')[0];
		this.grafico = new Grafico(divGraficos,{});

	}

	Main.prototype = Object.create(HtmlWidget.prototype);
	Main.prototype.constructor = "Main";

	Main.prototype.basicDraw = function(){
		var template = TrimPath.processDOMTemplate('mainPage',{});
		this.d.innerHTML = template;
	};

	Main.prototype.onCalc = function(data){

		this.diagramaRobot.ejecutar(data);
//		this.grafico.pushData(this.parametro.getTrayectoria());
//		this.grafico.show(true);
	};

	window.Main = Main;
})();


