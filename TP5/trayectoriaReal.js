(function(){
	function TrayectoriaReal(div,config){
		Trayectoria.call(this,div,config);

	}

	TrayectoriaReal.prototype = Object.create(Trayectoria.prototype);
	TrayectoriaReal.prototype.constructor = "TrayectoriaReal";

	TrayectoriaReal.prototype.primerTiempoMedio = function(tiempo, c, tipo){

		var indice = 0;

		if(c){
			indice = c.indice;
		}

		return this["funciones"+tipo][indice].inicio.evaluate({t : tiempo});
	};

	TrayectoriaReal.prototype.ultimoTiempoMedio = function(tiempo, c, tipo){

		var indice = this.cantidadSegmentos - 1;

		if(c){
			indice = c.indice;
		}

		return this["funciones"+tipo][indice].fin.evaluate({t : tiempo});
	};

	TrayectoriaReal.prototype.tiempoFueraAceleracion = function(tiempo, c, tipo){
		return this["funciones"+tipo][c.indice].medio.evaluate({t : tiempo});
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
			return this.funcionesposicion[indice-1].fin;
		}
		var funcionCuadraticaIni = math.parse(this.cuadratica((p.vel)/(this.tiempoAceleracion*2), 0, p.posIni, tiempoAcumulado), {t : 0});

		return funcionCuadraticaIni;
	};

	TrayectoriaReal.prototype.generarFuncion = function(datos, indice){

		var tiempoAcumulado = this.tiempoAcumulado(indice);

		var funcionCuadraticaIni = this.generarFuncionCuadraticaIni(datos, indice, tiempoAcumulado);
		var dfuncionCuadraticaIni = math.derivative(funcionCuadraticaIni,"t");
		var ddfuncionCuadraticaIni = math.derivative(dfuncionCuadraticaIni,"t");

//		console.log("esta es el Tiempo    en este segmento :"+datos.t);
//		console.log("esta es la Velocidad en este segmento :"+datos.vel);
//		console.log("esta es la PosFin    en este segmento :"+datos.posFin);
//		console.log("esta es la PosIni    en este segmento :"+datos.posIni);
		var funcionLineal = math.parse(this.lineal(datos.vel, funcionCuadraticaIni.evaluate({ t : (tiempoAcumulado + this.tiempoAceleracion)}), (tiempoAcumulado + this.tiempoAceleracion)), {t : 0});
		var dfuncionLineal = math.derivative(funcionLineal,"t");
		var ddfuncionLineal = math.derivative(dfuncionLineal,"t");

		var funcionCuadraticaFin = this.generarFuncionCuadraticaFin(datos, indice, funcionLineal.evaluate({t : (tiempoAcumulado + datos.t)}),(tiempoAcumulado));
		var dfuncionCuadraticaFin = math.derivative(funcionCuadraticaFin,"t");
		var ddfuncionCuadraticaFin = math.derivative(dfuncionCuadraticaFin,"t");

		this.funcionesposicion[indice] = {
			inicio : funcionCuadraticaIni,
			medio : funcionLineal,
			fin : funcionCuadraticaFin
		};

		this.funcionesvelocidad[indice] = {
			inicio : dfuncionCuadraticaIni,
			medio : dfuncionLineal,
			fin : dfuncionCuadraticaFin
		};

		this.funcionesaceleracion[indice] = {
			inicio : ddfuncionCuadraticaIni,
			medio : ddfuncionLineal,
			fin : ddfuncionCuadraticaFin
		};
	};

	window.TrayectoriaReal = TrayectoriaReal;
})();


