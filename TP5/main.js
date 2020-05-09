(function(){
	function Main(div,config){
		HtmlWidget.call(this,div,config);

		this.basicDraw();

		var divParametros = this.getElementsByClassName('parametros')[0];
		this.parametro = new Parametro(divParametros,{});
		this.parametro.addEventListener('calc',this.onCalc.bind(this));

		var divResultados = this.getElementsByClassName('resultados')[0];
		this.resultado = new Resultado(divResultados,{});

		var divGraficos = this.getElementsByClassName('graficos')[0];
		this.grafico = new Grafico(divGraficos,{});

	}

	Main.prototype = Object.create(HtmlWidget.prototype);
	Main.prototype.constructor = "Main";

	Main.prototype.basicDraw = function(){
		var template = TrimPath.processDOMTemplate('mainPage',{});
		this.d.innerHTML = template;
	};

	Main.prototype.onCalc = function(datos){
		console.log(datos);
	};

	window.Main = Main;
})();


