(function(){
	function Scara(){

		this.cantidadEjes = 2;

		this.eslabon1 = {
			largo : 0.4,
			Iglzz : 0.07,
			Ygl : 0,
			masa : 5
		}; //Sin el motor 2 conectado
		this.eslabon1.Xgl = -this.eslabon1.largo/2,

		this.eslabon2 = {
			largo : 0.3,
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
			radio : 0.111/2, //[mm]
		};
		this.motor1.Igmzz = (this.motor1.masa/2)*(this.motor1.radio/1000)*(this.motor1.radio/1000); //[Kg m^2] origen terna 2

		this.motor2 = {
			masa : 1.7, //[Kg]
			radio : 0.111/2, //[m]
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


		this.motorU9D_D = {};
	}

	Scara.prototype.constructor = "Scara";

	Scara.prototype.constantesControl = function(){

		var a1 = this.eslabon1.largo; //[mm]
		var a2 = this.eslabon2.largo; //[mm]
		var i1zz = this.eslabon1ConCarga.Izz;
		var m1 = this.eslabon1ConCarga.masa;
		var xg1 = this.eslabon1ConCarga.Xgl;
		var i2zz = this.eslabon2ConCarga.Izz;
		var m2 = this.eslabon2ConCarga.masa;
		var xg2 = this.eslabon2ConCarga.Xgl;
		var yg2 = this.eslabon2ConCarga.Ygl;

		var m22 = i2zz + 2*a2*xg2*m2 + a2*a2*m2;
		var m12_max = m22 + a1*(a2+xg2);
		var m12_min = m22 - a1*(a2+xg2);
		var m11_max = i1zz + 2*a1*xg1*m1 + a1*a1*(m1+m2) + 2*m12_min - m22;
		var m11_min = i1zz + 2*a1*xg1*m1 + a1*a1*(m1+m2) + 2*m12_min - m22;

		var m11rr = (m11_max + m11_min)/2;
		var m22rr = i2zz + 2*a2*xg2*m2 + a2*a2*m2;

		var jm = this.motorU9D_D.Jm;
		var km = this.motorU9D_D.Km;
		var bm = this.motorU9D_D.Bm;
		var n = this.motorU9D_D.N;
		var tauMax = this.motorU9D_D.Tau_max;

		var jeff = [
			[(jm*n*n + m11rr),                0],
			[               0, (jm*n*n + m22rr)]
		];

		var wn = 2*math.pi*30;
		var kp = {
			1 : jeff[0][0]*wn*wn/(km*n),
			2 : jeff[1][1]*wn*wn/(km*n)
		};

		var kd = {
			1 : (math.sqrt(km*n*kp["1"]*jeff[0][0])/(km*n)) - bm*n*n,
			2 : (math.sqrt(km*n*kp["2"]*jeff[1][1])/(km*n)) - bm*n*n
		};

		return {
			kd : kd,
			kp : kp,
			km : km,
			tauMax : tauMax
		}
	};

	Scara.prototype.actualizarFrecuencia = function(tiempoMuestreo){
		this.motorU9D_D = {
			wm : 2*math.pi/ tiempoMuestreo,
			Jm : 3.95e-5, //Nm,
			Bm : 0.8*3/(math.pi*1e3), // Nm/(rad/s),
			N : 100,
			Fm : [[0*2.8/100],[0*2.8/100]],
			Km : 0.076, //Nm/A
			v_max : 6000*2*math.pi/60, //[rad/seg]
			Tau_max : 5.134 // [Nm]
		};
	};

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

//		//|a1+a2.c2 -a2.s2   | |c1|   | x |
//		//|a2.s2     a1+a2.c2| |s1| = | y |

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

	Scara.prototype.matrizDinamica = function(theta, thetap){
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

		var theta1 = theta["1"]; // vector de dos componentes, sale de x
		var theta2 = theta["2"]; // vector de dos componentes, sale de x
		var thetap1 = thetap["1"]; // vector de dos componentes, sale de x
		var thetap2 = thetap["2"]; // vector de dos componentes, sale de x

		var g = math.gravity.value;

		var matM22 = i2zz + 2*a2*xg2*m2 + a2*a2*m2;
		var matM21 = matM22 + a1*((a2+xg2)*math.cos(theta2)-yg2*math.sin(theta2))*m2;
		var matM11 = i1zz + 2*a1*xg1*m1 + a1*a1*(m1+m2) + 2*matM21 - matM22;

		matM = [
			[matM11, matM21],
			[matM21, matM22]
		];

		vecH = [
			-a1*((a2 + xg2)*math.sin(theta2) + yg2*math.cos(theta2))*m2*(2*thetap1*thetap2+thetap2*thetap2),
			-a1*((a2 + xg2)*math.sin(theta2) + yg2*math.cos(theta2))*m2*(-thetap2*thetap2)
		];

		vecG2 = m2*g*((xg2 + a2)*math.cos(theta1+theta2)- yg2*math.sin(theta1+theta2));
		vecG = [
			m1*g*((xg1 + a1)*math.cos(theta1)- yg1*math.sin(theta1)) + m2*g*a1*math.cos(theta1) + vecG2,
			vecG2
		];

		return {
			matM : matM,
			vecH : vecH,
			vecG : vecG
		}
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

	Scara.prototype.modeloDinamico = function(tiempo, x, xp, control){

		var jm = this.motorU9D_D.Jm;
		var km = this.motorU9D_D.Km;
		var bm = this.motorU9D_D.Bm;
		var n = this.motorU9D_D.N;

		var u1 = control.u1;
		var u2 = control.u2;

		var torque1 = km*n*u1;
		var torque2 = km*n*u2;

		var nejes = this.cantidadEjes;
		var parametrosDinamicos = this.matrizDinamica(x, xp);

		var thetap = xp;

		var matA = parametrosDinamicos.matM;
		matA[0][0] += jm*n*n;
		matA[1][1] += jm*n*n;

		var vecb = [
			torque1 -bm*n*n*thetap["1"] - parametrosDinamicos.vecH[0] - parametrosDinamicos.vecG[0],
			torque2 -bm*n*n*thetap["2"] - parametrosDinamicos.vecH[1] - parametrosDinamicos.vecG[1]
		];
		var res = this.metodoCramer(matA, vecb);
		var thetapp = {
			1 : res.x,
			2 : res.y
		};

		return {
			thetap : thetap,
			thetapp : thetapp
		}
	}


	window.Scara = Scara;
})();
