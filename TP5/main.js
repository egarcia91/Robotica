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

		var divGraficos = this.getElementsByClassName('graficos');
		this.graficoPosicion = new Grafico(divGraficos[0],{});
		this.graficoVelocidad = new Grafico(divGraficos[1],{});
		this.graficoAceleracion = new Grafico(divGraficos[2],{});

	}

	Main.prototype = Object.create(HtmlWidget.prototype);
	Main.prototype.constructor = "Main";

	Main.prototype.basicDraw = function(){
		var template = TrimPath.processDOMTemplate('mainPage',{});
		this.d.innerHTML = template;
	};

	Main.prototype.onCalc = function(data){

		this.diagramaRobot.ejecutar(data);

		var res = this.diagramaRobot.getTrayectoria();
		this.graficoPosicion.pushData(res,"posicion");
		this.graficoPosicion.show(true);
		this.graficoVelocidad.pushData(res,"velocidad");
		this.graficoVelocidad.show(true);
		this.graficoAceleracion.pushData(res,"aceleracion");
		this.graficoAceleracion.show(true);
	};

	window.Main = Main;
})();


