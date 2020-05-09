(function(){
	function Parametro(div,config){
		HtmlWidget.call(this,div,config);

		this.basicDraw();

		this.trayectoriaReal = new TrayectoriaReal(null,{});

	}

	Parametro.prototype = Object.create(HtmlWidget.prototype);
	Parametro.prototype.constructor = "Parametro";

	Parametro.prototype.thisClick = function(event,t,that){
		var name = t.getAttribute('data-evt');
		switch(name){
			case "calculo":
				this.calculate();
				return true;
				break;
			default:
				return true;
				break;
		}
		return true;
	};

	Parametro.prototype.calculate = function(){
		this.getData();
	};

	Parametro.prototype.getData = function(){

		this.datos = {};

		this.getElementsByClassName('datos', function(ele){
			this.datos[ele.getAttribute('data-name')] = parseFloat(ele.value);
		});
		console.log(this);
		//this.emit('calc',"nada");
	};

	Parametro.prototype.basicDraw = function(){
		var template = TrimPath.processDOMTemplate('parametros',{});

		this.d.innerHTML = template;
	};


	window.Parametro = Parametro;
})();


