(function(){
	function TrayectoriaIdeal(div,config){
		Trayectoria.call(this,div,config);

		this.funciones = [];
	}

	TrayectoriaIdeal.prototype = Object.create(Trayectoria.prototype);
	TrayectoriaIdeal.prototype.constructor = "TrayectoriaIdeal";

	TrayectoriaIdeal.prototype.primerTiempoMedio = function(tiempo, c){
		if(c){
			return this.funciones[c.indice].eval({t : c.tiempoRelativo});
		}
		return this["constante"](this.posiciones[0].posIni);
	};

	TrayectoriaIdeal.prototype.ultimoTiempoMedio = function(tiempo, c){
		if(c){
			return this.funciones[c.indice].eval({t : c.tiempoRelativo});
		}
		return this["constante"](this.posiciones[this.cantidadSegmentos - 1].posFin);
	};

	TrayectoriaIdeal.prototype.tiempoFueraAceleracion = function(tiempo, c){
		return this.funciones[c.indice].eval({t : c.tiempoRelativo});
	};

	TrayectoriaIdeal.prototype.generarFuncion = function(p, indice){
		var pendiente = (p.posFin - p.posIni)/p.t;
		var ordenada = p.posIni;
		var funcion = math.parse(this.lineal(pendiente, ordenada), {t : 0});

		this.funciones[indice] = funcion;
	};

	window.TrayectoriaIdeal = TrayectoriaIdeal;
})();


