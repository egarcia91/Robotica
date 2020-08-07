(function(){
	function TrayectoriaIdeal(div,config){
		Trayectoria.call(this,div,config);

	}

	TrayectoriaIdeal.prototype = Object.create(Trayectoria.prototype);
	TrayectoriaIdeal.prototype.constructor = "TrayectoriaIdeal";

	TrayectoriaIdeal.prototype.primerTiempoMedio = function(tiempo, c, tipo){
		if(c){
			return this["funciones"+tipo][c.indice].evaluate({t : c.tiempoRelativo});
		}
		if(tipo == "posicion"){
			console.log(this.posiciones[0]);
			return this["constante"](this.posiciones[0].posIni);
		} else {
			return 0;
		}
	};

	TrayectoriaIdeal.prototype.ultimoTiempoMedio = function(tiempo, c, tipo){
		if(c){
			return this["funciones"+tipo][c.indice].evaluate({t : c.tiempoRelativo});
		}
		if(tipo == "posicion"){
			return this["constante"](this.posiciones[this.cantidadSegmentos - 1].posFin);
		} else {
			return 0;
		}
	};

	TrayectoriaIdeal.prototype.tiempoFueraAceleracion = function(tiempo, c, tipo){
		return this["funciones"+tipo][c.indice].evaluate({t : c.tiempoRelativo});
	};

	TrayectoriaIdeal.prototype.generarFuncionLieal = function(p, indice, tiempoAcumulado){
		var pendiente = (p.posFin - p.posIni)/p.t;
		var ordenada = p.posIni;
		return math.parse(this.lineal(pendiente, ordenada), {t : 0});
	};

	TrayectoriaIdeal.prototype.generarFuncion = function(p, indice){

		var tiempoAcumulado = this.tiempoAcumulado(indice);

		var funcion = this.generarFuncionLieal(p, indice, tiempoAcumulado);
		var dfuncion = math.derivative(funcion, "t");
		var ddfuncion = math.derivative(dfuncion, "t");

		this.funcionesposicion[indice] = funcion;
		this.funcionesvelocidad[indice] = dfuncion;
		this.funcionesaceleracion[indice] = ddfuncion;
	};

	window.TrayectoriaIdeal = TrayectoriaIdeal;
})();


