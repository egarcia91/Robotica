(function(){
	function Scara(){

		this.cantidadEjes = 2;

		this.tiempoMuestreo = 1e-3;

		this.tiempoAceleracion = 100e-3;

		this.eslabon1 = {
			largo : 0.400,
			Iglzz : 0.07,
			Ygl : 0,
			masa : 5
		}; //Sin el motor 2 conectado
		this.eslabon1.Xgl = -this.eslabon1.largo/2,

		this.eslabon2 = {
			largo : 0.300,
			Iglzz : 0.015,
			Ygl : 0,
			masa : 2
		}; //Sin la carga conectada
		this.eslabon2.Xgl = -this.eslabon2.largo/2,

		this.tablaDenavitHartenberg = [
			[this.eslabon1.largo, 0, 0, 0],
			[this.eslabon2.largo, 0, 0, 0]
		];

		this.carga = {
			masa : 1, //[Kg]
			Iglzz : 0 //[Kg m^2] origen terna 2
		};

		this.motor1 = {
			masa : 1.7, //[Kg]
			radio : 0.111/2, //[m]
		};
		this.motor1.Igmzz = (this.motor1.masa/2)*(this.motor1.radio/1000)*(this.motor1.radio/1000); //[Kg m^2] origen terna 2

		this.motor2 = {
			masa : 1.7, //[Kg]
			radio : 0.111/2, //[mm]
		};
		this.motor2.Igmzz = (this.motor2.masa/2)*(this.motor2.radio/1000)*(this.motor2.radio/1000); //[Kg m^2] origen terna 2

		this.eslabon1ConCarga = {
			Izz : (this.eslabon1.Iglzz+this.eslabon1.masa*(this.eslabon1.Xgl*this.eslabon1.Xgl+this.eslabon1.Ygl*this.eslabon1.Ygl))+(this.motor2.Igmzz),
			Xgl : ((this.eslabon1.Xgl*this.eslabon1.masa) + (0*this.motor2.masa))/(this.eslabon1.masa+this.motor2.masa),
			Ygl : ((this.eslabon1.Ygl*this.eslabon1.masa) + (0*this.motor2.masa))/(this.eslabon1.masa+this.motor2.masa),
			masa : (this.eslabon1.masa + this.motor2.masa)
		};

		this.eslabon2ConCarga = {
			Izz : (this.eslabon2.Iglzz+this.eslabon2.masa*(this.eslabon2.Xgl*this.eslabon2.Xgl+this.eslabon1.Ygl*this.eslabon1.Ygl)),
			Xgl : ((this.eslabon2.Xgl*this.eslabon2.masa) + (0*this.carga.masa))/(this.eslabon2.masa+this.carga.masa),
			Ygl : ((this.eslabon2.Ygl*this.eslabon2.masa) + (0*this.carga.masa))/(this.eslabon2.masa+this.carga.masa),
			masa : (this.eslabon2.masa + this.carga.masa)
		};


//		Seleccion motor "U9D_D"
		this.caracteristicasMotor = {
			wm : 2*math.pi/this.tiempoMuestreo,
			Jm : 3.95e-5, //Nm
			Bm : 0.8*3/(math.pi*1e3), // Nm/(rad/s)
			N : 100,
			Fm : [
				[0*2.8/100],
				[0*2.8/100]
			],
			Km : 0.076, //Nm/A
			velocidadMax : 6000*2*math.pi/60, //[rad/seg]
			tauMax : 5.134 // [Nm]
		};
	}

	Scara.prototype.constructor = "Scara";

	Scara.prototype.determinante = function(matrizA){
		//solo para 2x2

		return (matrizA[0][0]*matrizA[1][1]) - (matrizA[0][1]*matrizA[1][0]);
	};

	Scara.prototype.metodoCramer = function(matrizA, vectorb){
		var detA = this.determinante(matrizA);

		var matrizX = JSON.parse(JSON.stringify(matrizA));
		matrizX[0][0] = vectorb[0];
		matrizX[1][0] = vectorb[1];
		var detX = this.determinante(matrizX);

		var matrizY = JSON.parse(JSON.stringify(matrizA));
		matrizY[0][1] = vectorb[0];
		matrizY[1][1] = vectorb[1];
		var detY = this.determinante(matrizY);
		return {
			x : detX/detA,
			y : detY/detA
		}
	};

	Scara.prototype.problemaInverso = function(x, y, z, g){
		var theta1 = undefined;
		var theta2 = undefined;

		var a1 = this.eslabon1.largo; //[mm]
		var a2 = this.eslabon2.largo; //[mm]

//		//A x = b
//
//		//|a1+a2.c2 -a2.s2   | |c1|   | x |
//		//|a2.s2     a1+a2.c2| |s1| = | y |
//
		var vectorb = [
			x,
			y
		];

		var c2 = (x*x + y*y -a1*a1 -a2*a2)/(2*a1*a2);
		if( math.abs(c2) <= 1){
			var s2 = g*math.sqrt(1-c2*c2);
			theta2 = math.atan2(s2,c2);
			var matrizA = [
				[ a1+a2*c2,   -a2*s2 ],
				[    a2*s2, a1+a2*c2 ]
			];
			var resolucion = this.metodoCramer(matrizA, vectorb);
			var c1 = resolucion.x;
			var s1 = resolucion.y;
			theta1 = math.atan2(s1,c1);
		}

		return {
			'theta1' : theta1,
			'theta2' : theta2
		};
	};

	Scara.prototype.modeloDinamico = function(tiempo, estadoActualPosicion, estadoActualVelocidad, fuerzaControl){
		var t = tiempo;
		var x = estadoActualPosicion; //theta
//		var x = estadoActualVelocidad; //thetap
		var u = fuerzaControl;

		var n = this.caracteristicasMotor.N;
		var jm = this.caracteristicasMotor.Jm;
		var bm = this.caracteristicasMotor.Bm;
		var km = this.caracteristicasMotor.Km;

		var torque = km*n*u;
		var n_ejes = this.cantidadEjes;
		var res = this.matrizDinamica(x);

//		thetap = x(n_ejes+1:end);
//		theta2p = (M+Jm*N^2)\( Torq -Bm*N^2*thetap -H -G);
//		dxdt = [thetap; theta2p];

	};

	Scara.prototype.matrizDinamica = function(posicion, velocidad){
		var matM;
		var vecH;
		var vecG;

		var a1 = this.eslabon1.largo; //[mm]
		var a2 = this.eslabon2.largo; //[mm]


		var i1zz = this.eslabon1ConCarga.Izz;
		var xg1 = this.eslabon1ConCarga.Xgl;
		var yg1 = this.eslabon1ConCarga.Ygl;
		var m1 = this.eslabon1ConCarga.masa;

		var i2zz = this.eslabon2ConCarga.Izz;
		var xg2 = this.eslabon2ConCarga.Xgl;
		var yg2 = this.eslabon2ConCarga.Ygl;
		var m2 = this.eslabon2ConCarga.masa;

		var theta = [ 1, 2]; // vector de dos componentes, sale de x
		var thetap = [3, 4]; // vector de dos componenete, sale de x

		var g = math.gravity.value;

		var matM22 = i2zz + 2*a2*xg2*m2 + a2*a2*m2;
		var matM21 = matM22 + a1*((a2+xg2)*math.cos(theta[1])-yg2*math.sin(theta[1]))*m2;
		var matM11 = i1zz + 2*a1*xg1*m1 + a1*a1*(m1+m2) + 2*matM21 - matM22;

		matM = [
			[matM11, matM21],
			[matM21, matM22]
		];

		vecH = [
			-a1*((a2 + xg2)*math.sin(theta[1]) + yg2*math.cos(theta[1]))*m2*(2*thetap[0]*thetap[1]+thetap[1]*thetap[1]),
			-a1*((a2 + xg2)*math.sin(theta[1]) + yg2*math.cos(theta[1]))*m2*(-thetap[2]*thetap[2])
		];

		vecG2 = m2*g*((xg2 + a2)*math.cos(theta[0]+theta[1])- yg2*math.sin(theta[0]+theta[1]));
		vecG = [
			m1*g*((xg1 + a1)*math.cos(theta[0])- yg1*math.sin(theta[0])) + m2*g*a1*math.cos(theta[0]) + vecG2,
			vecG2
		];

		return {
			'matM' : matM,
			'vecH' : vecH,
			'vecG' : vecG
		};
	};

	Scara.prototype.problemaDirecto = function(t1, t2){

		var a1 = this.eslabon1.largo; //[mm]
		var a2 = this.eslabon2.largo; //[mm]

		var rotoTraslacion = [
			[ math.cos(t1+t2),    -math.sin(t1+t2),    0,  a1*math.cos(t1) + a2*math.cos(t1+t2) ],
			[ math.sin(t1+t2),     math.cos(t1+t2),    0,  a1*math.sin(t1) + a2*math.sin(t1+t2) ],
			[               0,                   0,    1,                                     0 ],
			[               0,                   0,    0,                                     1 ]
		];

		var config = math.sign(math.sin(t2));

		return rotoTraslacion[0][3];
	};

	window.Scara = Scara;
})();

