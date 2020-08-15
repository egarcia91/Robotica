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
		this.graficoPosicion1 = new Grafico(divGraficos[0],{});
		this.graficoVelocidad1 = new Grafico(divGraficos[1],{});
		this.graficoAceleracion1 = new Grafico(divGraficos[2],{});
		this.graficoPosicion2 = new Grafico(divGraficos[3],{});
		this.graficoVelocidad2 = new Grafico(divGraficos[4],{});
		this.graficoAceleracion2 = new Grafico(divGraficos[5],{});
		this.graficoPosicion3 = new Grafico(divGraficos[6],{});

		this.res = {};
	}

	Main.prototype = Object.create(HtmlWidget.prototype);
	Main.prototype.constructor = "Main";

	Main.prototype.basicDraw = function(){
		var template = TrimPath.processDOMTemplate('mainPage',{});
		this.d.innerHTML = template;
	};

	Main.prototype.onCalc = function(data){

		this.diagramaRobot.ejecutar(data);

		this.res = this.diagramaRobot.getTrayectoria();
		this._QUE_GRAFICAR();

	};

	Main.prototype._QUE_GRAFICAR = function(){
		var res = this.res || {};
		new Animacion({
			theta1 : res["motor1"],
			theta2 : res["motor2"]
		});
		this.graficoPosicion1.pushData(res["X"],"posicion");
		this.graficoPosicion1.show(true);
		this.graficoVelocidad1.pushData(res["X"],"velocidad");
		this.graficoVelocidad1.show(true);
		this.graficoAceleracion1.pushData(res["X"],"aceleracion");
		this.graficoAceleracion1.show(true);

		this.graficoPosicion2.pushData(res["Y"],"posicion");
		this.graficoPosicion2.show(true);
		this.graficoVelocidad2.pushData(res["Y"],"velocidad");
		this.graficoVelocidad2.show(true);
		this.graficoAceleracion2.pushData(res["Y"],"aceleracion");
		this.graficoAceleracion2.show(true);

		this.graficoPosicion3.pushData(res["X"],"posicion",res["Y"]);
		this.graficoPosicion3.show(true);
	};

	window.Main = Main;
})();


