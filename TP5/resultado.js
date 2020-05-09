(function(){
	function Resultado(div,config){
		HtmlWidget.call(this,div,config);

		this.basicDraw();
	}

	Resultado.prototype = Object.create(HtmlWidget.prototype);
	Resultado.prototype.constructor = "Resultado";

	Resultado.prototype.basicDraw = function(){
		var template = TrimPath.processDOMTemplate('resultados',{});
		this.d.innerHTML = template;
	};

	window.Resultado = Resultado;
})();


