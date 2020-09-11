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
		this.grafico1 = new Grafico(divGraficos[0],{});
		this.grafico2 = new Grafico(divGraficos[1],{});
		this.grafico3 = new Grafico(divGraficos[2],{});
		this.grafico4 = new Grafico(divGraficos[3],{});
		this.grafico5 = new Grafico(divGraficos[4],{});
		this.grafico6 = new Grafico(divGraficos[5],{});
		this.grafico7 = new Grafico(divGraficos[6],{});
		this.grafico8 = new Grafico(divGraficos[7],{});
		this.grafico9 = new Grafico(divGraficos[8],{});
		this.grafico10 = new Grafico(divGraficos[9],{});

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
		console.log(this.res);
		this._QUE_GRAFICAR();

	};

	Main.prototype._QUE_GRAFICAR = function(){
		var res = this.res || {};
//		new Animacion({
//			theta1 : res["motor1"],
//			theta2 : res["motor2"]
//		});
		this.grafico1.subirData(res, 'trayectorias', 'posicion', 'x');
		this.grafico1.show(true);

		this.grafico2.subirData(res, 'motores', 'angulo', 't1');
		this.grafico2.show(true);

		this.grafico3.subirData(res, 'motores', 'velocidadAngular', 't1');
		this.grafico3.show(true);

		this.grafico4.subirData(res, 'distanciaTrayectorias', null, 'x');
		this.grafico4.show(true);

		this.grafico5.subirData(res, 'fuerzas', null, 'u1');
		this.grafico5.show(true);

		this.grafico6.subirData(res, 'trayectorias', 'posicion', 'y');
		this.grafico6.show(true);

		this.grafico7.subirData(res, 'motores', 'angulo', 't2');
		this.grafico7.show(true);

		this.grafico8.subirData(res, 'motores', 'velocidadAngular', 't2');
		this.grafico8.show(true);

		this.grafico9.subirData(res, 'distanciaTrayectorias', null, 'y');
		this.grafico9.show(true);

		this.grafico10.subirData(res, 'fuerzas', null, 'u2');
		this.grafico10.show(true);

	};

	window.Main = Main;
})();


