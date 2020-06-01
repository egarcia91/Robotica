(function(){
	function TrayectoriaReal(div,config){
		Trayectoria.call(this,div,config);

		this.funciones = [];
	}

	TrayectoriaReal.prototype = Object.create(Trayectoria.prototype);
	TrayectoriaReal.prototype.constructor = "TrayectoriaReal";

	TrayectoriaReal.prototype.primerTiempoMedio = function(tiempo, c){

		var indice = 0;

		if(c){
			indice = c.indice;
		}

		return this.funciones[indice].inicio.eval({t : tiempo});
	};

	TrayectoriaReal.prototype.ultimoTiempoMedio = function(tiempo, c){

		var indice = this.cantidadSegmentos - 1;

		if(c){
			indice = c.indice;
		}

		return this.funciones[indice].fin.eval({t : tiempo});
	};

	TrayectoriaReal.prototype.tiempoFueraAceleracion = function(tiempo, c){
		return this.funciones[c.indice].medio.eval({t : tiempo});
	};

	TrayectoriaReal.prototype.tiempoAcumulado = function(indice){

		var tiempoAcumulado = 0;

		for(var i = 0, ele; ele = this.posiciones[i]; i++){
			if(i == indice){
				break;
			}
			tiempoAcumulado += ele.t

		}
		return tiempoAcumulado
	};

	TrayectoriaReal.prototype.generarFuncionCuadraticaFin = function(p, indice, pos, tiempoAcumulado){
		var sigPosicion = this.posiciones[indice+1];
		var velSiguiente = 0;
		if(sigPosicion){
			velSiguiente = sigPosicion.vel;
		}

		var funcionCuadraticaFin = math.parse(this.cuadratica((velSiguiente-p.vel)/(this.tiempoAceleracion*2),p.vel,pos, (tiempoAcumulado + p.t)), {t : 0});
		return funcionCuadraticaFin;
	};

	TrayectoriaReal.prototype.generarFuncionCuadraticaIni = function(p, indice, tiempoAcumulado){
		if(indice){
			return this.funciones[indice-1].fin;
		}
		var funcionCuadraticaIni = math.parse(this.cuadratica((p.vel)/(this.tiempoAceleracion*2), 0, p.posIni, tiempoAcumulado), {t : 0});

		return funcionCuadraticaIni;
	};

	TrayectoriaReal.prototype.generarFuncion = function(p, indice){

		var tiempoAcumulado = this.tiempoAcumulado(indice);

		var funcionCuadraticaIni = this.generarFuncionCuadraticaIni(p, indice, tiempoAcumulado);

		var funcionLineal = math.parse(this.lineal(p.vel, funcionCuadraticaIni.eval({ t : (tiempoAcumulado + this.tiempoAceleracion)}), (tiempoAcumulado + this.tiempoAceleracion)), {t : 0});

		var funcionCuadraticaFin = this.generarFuncionCuadraticaFin(p, indice, funcionLineal.eval({t : (tiempoAcumulado + p.t)}),(tiempoAcumulado));

		this.funciones[indice] = {
			inicio : funcionCuadraticaIni,
			medio : funcionLineal,
			fin : funcionCuadraticaFin
		};
	};

	window.TrayectoriaReal = TrayectoriaReal;
})();


