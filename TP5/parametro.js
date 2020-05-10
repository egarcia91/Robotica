(function(){
	function Parametro(div,config){
		HtmlWidget.call(this,div,config);

		this.basicDraw();

		var divSegementos = this.getElementsByClassName('segmento')[0];
		this.segmentos = new Segmento(divSegementos,{
			len : 1,
			indice : 0,
			defecto : JSON.parse(JSON.stringify(this.defecto[0]))
		});
		this.segmentos.addEventListener('quierenAgregar', this.onAgregar.bind(this));
		this.segmentos.addEventListener('mostrar', this.onMostrar.bind(this));
		this.segmentos.addEventListener('quierenCambiarParametro', this.onCambio.bind(this));


		this.trayectoriaReal = new TrayectoriaReal(null,{});

		this.datosSegmentos = JSON.parse(JSON.stringify(this.defecto));
	}

	Parametro.prototype = Object.create(HtmlWidget.prototype);
	Parametro.prototype.constructor = "Parametro";

	Parametro.prototype.defecto = [{
		posIni : -300,
		posFin : 300,
		vel : 1,
		t : 1
	}];

	Parametro.prototype.nuevo = {
		posIni : 0,
		posFin : 0,
		vel : 1,
		t : 0
	};


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

		this.trayectoriaReal.calcular(JSON.parse(JSON.stringify(this.datos)));
	};

	Parametro.prototype.onCambio = function(indice, nombre, valor){
		var nuevoValor = parseFloat(valor);
		this.datosSegmentos[indice][nombre] = nuevoValor;

		if(nombre == 'posFin'){
			var siguiente = this.datosSegmentos[indice+1];
			if(siguiente){
				siguiente.posIni = nuevoValor;
			}
		}
	};

	Parametro.prototype.onMostrar = function(indice){
		this.segmentos.mostrar(JSON.parse(JSON.stringify(this.datosSegmentos[indice])));
	};

	Parametro.prototype.onAgregar = function(indice){

		var nuevo = JSON.parse(JSON.stringify(this.nuevo));
		var posicionAnterior = this.datosSegmentos[indice].posFin;
		nuevo.posIni = posicionAnterior;
		nuevo.posFin = posicionAnterior;

		this.datosSegmentos.splice((indice+1), 0, (JSON.parse(JSON.stringify(nuevo))));
		this.segmentos.recargarInfo(this.datosSegmentos.length, indice+1);
		this.segmentos.mostrar(JSON.parse(JSON.stringify(this.datosSegmentos[indice+1])));
	};

	Parametro.prototype.getData = function(){

		this.datos = {};

		this.getElementsByClassName('datos', function(ele){
			this.datos[ele.getAttribute('data-name')] = parseFloat(ele.value);
		});
		//this.emit('calc',"nada");
	};

	Parametro.prototype.basicDraw = function(){
		var template = TrimPath.processDOMTemplate('parametros',{});

		this.d.innerHTML = template;
	};


	window.Parametro = Parametro;
})();


