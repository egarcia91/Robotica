(function(){
	function Main(div,config){
		HtmlWidget.call(this,div,config);

		this.basicDraw();

		var divParametros = this.getElementsByClassName('parametros')[0];
		this.parametro = new Parametro(divParametros,{});
		this.parametro.addEventListener('calcule',this.onCalc.bind(this));
		this.parametro.addEventListener('pagina',this.onCambioPag.bind(this));

//		var divResultados = this.getElementsByClassName('resultados')[0];
//		this.resultado = new Resultado(divResultados,{});

		this.diagramaRobot = new DiagramaRobot(undefined,{});

		var divGraficos = this.getElementsByClassName('graficos');
		this.graficoPosicion = new Grafico(divGraficos[0],{});
		this.graficoVelocidad = new Grafico(divGraficos[1],{});
		this.graficoAceleracion = new Grafico(divGraficos[2],{});

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

//		this.res = this.diagramaRobot.getTrayectoria();
//		this._QUE_GRAFICAR();

	};

	Main.prototype.onCambioPag = function(desde, hasta){
		this._QUE_GRAFICAR(desde, hasta);
	};

	Main.prototype._QUE_GRAFICAR = function(desde, hasta){
		var res = this.res || {};
		var resAux = JSON.parse(JSON.stringify(this.res));
		var finPaginado = hasta || res.Ideal.length;
		var inicioPaginado = desde || 0;
		resAux.Ideal = res.Ideal.slice(inicioPaginado, finPaginado);
		resAux.Real = res.Real.slice(inicioPaginado, finPaginado);
		this.graficoPosicion.pushData(resAux,"posicion");
		this.graficoPosicion.show(true);
		this.graficoVelocidad.pushData(resAux,"velocidad");
		this.graficoVelocidad.show(true);
		this.graficoAceleracion.pushData(resAux,"aceleracion");
		this.graficoAceleracion.show(true);
	};

	window.Main = Main;
})();


