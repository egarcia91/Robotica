(function(){
	function TrayectoriaIdeal(div,config){
		Trayectoria.call(this,div,config);

	}

	TrayectoriaIdeal.prototype = Object.create(Trayectoria.prototype);
	TrayectoriaIdeal.prototype.constructor = "TrayectoriaIdeal";

	TrayectoriaIdeal.prototype.primerTiempoMedio = function(tiempo, c, tipo){
		if(c){
			return this["funciones"+tipo][c.indice].eval({t : c.tiempoRelativo});
		}
		return this["constante"](this.posiciones[0].posIni);
	};

	TrayectoriaIdeal.prototype.ultimoTiempoMedio = function(tiempo, c, tipo){
		if(c){
			return this["funciones"+tipo][c.indice].eval({t : c.tiempoRelativo});
		}
		return this["constante"](this.posiciones[this.cantidadSegmentos - 1].posFin);
	};

	TrayectoriaIdeal.prototype.tiempoFueraAceleracion = function(tiempo, c, tipo){
		return this["funciones"+tipo][c.indice].eval({t : c.tiempoRelativo});
	};

	TrayectoriaIdeal.prototype.generarFuncion = function(p, indice){
		var pendiente = (p.posFin - p.posIni)/p.t;
		var ordenada = p.posIni;
		var funcion = math.parse(this.lineal(pendiente, ordenada), {t : 0});
		var dfuncion = math.derivative(funcion, "t");
		var ddfuncion = math.derivative(dfuncion, "t");

		this.funcionesposicion[indice] = funcion;
		this.funcionesvelocidad[indice] = dfuncion;
		this.funcionesaceleracion[indice] = ddfuncion;
	};

	window.TrayectoriaIdeal = TrayectoriaIdeal;
})();


