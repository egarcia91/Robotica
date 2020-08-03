(function(){
	function Scara(){

		this.cantidadEjes = 2;

		this.eslabon1 = {
			largo : 400,
			Iglzz : 0.07,
			Ygl : 0,
			masa : 5
		}; //Sin el motor 2 conectado
		this.eslabon1.Xgl = -this.eslabon1.largo/2,

		this.eslabon2 = {
			largo : 300,
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
			radio : 111/2, //[mm]
		};
		this.motor1.Igmzz = (this.motor1.masa/2)*(this.motor1.radio/1000)*(this.motor1.radio/1000); //[Kg m^2] origen terna 2

		this.motor2 = {
			masa : 1.7, //[Kg]
			radio : 111/2, //[mm]
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


		this.motorU9D_D = {
//			wm : 2*math.pi/ tiempomuestreo,
//			Jm : 3.95E-5*identidad(2,2), //Nm,
//			Bm : 0.8*3/(math.pi*1e3)*identidad(2,2), // Nm/(rad/s),
//			N : 100*identidad(2,2),
//			Fm : [[0*2.8/100],[0*2.8/100]],
//			Km : 0.076*identidad(2), //Nm/A
//			v_max : 6000*2*math.pi/60, //[rad/seg]
//			Tau_max : 5.134 // [Nm]
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


//////% **************************************************************
//////% Parametros del robot
//////% **************************************************************


//////% Parámetros dinámicos para el eslabón 1 
//////% calculados al origen de la terna del eslabón. 
//////% Cuando se incluyan los motores,  suponer que el motor 2
//////% está fijado al eslabón 1.
//////global I01zz Xg1 Yg1 m1;
//////I01zz = (Igl1zz + ml1 * (Xgl1^2+Ygl1^2)) + (Igm2zz);
//////Xg1 = ((Xgl1*ml1) + (0*mm2))/(ml1+mm2);
//////Yg1 = ((Ygl1*ml1) + (0*mm2))/(ml1+mm2);
//////m1 = ml1 + mm2;
//////
//////global I02zz Xg2 Yg2 m2;
//////% Parámetros dinámicos para el eslabón 2, calculados al origen de la terna 2
//////% Cuando se incluya el efecto de la carga, considerarla colgada en el origen
//////% de la terna 2.
//////I02zz = (Igl2zz + ml2 * (Xgl2^2+Ygl2^2)) ;
//////Xg2 = ((Xgl2*ml2) + 0*ml)/(ml2+ml); 
//////Yg2 = ((Ygl2*ml2)+ 0*ml)/(ml2+ml) ; 
//////m2 = ml2 + ml;
//////
//////% **************************************************************
//////% Parametros del motor
//////% **************************************************************
//////% VALORES del manual de Kollmorgen
//////global Jm;
//////global Bm;
//////global N;
//////global Fm;
//////global Km;
//////global fe;
//////global fm;
//////
//////% Valores originales
//////%{
//////Jm = 1E-5*eye(2,2);      
//////Bm = 0.000076*eye(2,2);         % Nm/(rad/s)   
//////N = 1*eye(2,2);
//////Fm = 0*[2.8/100;2.8/100];	% Si deseara considerar su efecto, incluirla en el modelo
//////
//////Km=0.10*eye(2);      % Nm/A
//////
//////% Maximos del motor
//////v_max = 3000*RPM;   % [rad/seg]
//////Tau_max = 1;       % [Nm]
//////%}
//////
//////
//////
//////%{
//////% Motor U9D-A
//////wm = 2*pi/Tm;
//////%we = ;
//////Jm = 3.95E-5*eye(2,2); % Nm      
//////Bm = 5.73E-4*eye(2,2);         % Nm/(rad/s)   
//////N = 100*eye(2,2);
//////Fm = 0*[2.8/100;2.8/100];	% Si deseara considerar su efecto, incluirla en el modelo
//////
//////Km=0.048*eye(2);      % Nm/A
//////
//////% Maximos del motor
//////v_max = 6000*RPM;   % [rad/seg]
//////Tau_max = 3.199;       % [Nm]
//////%}
//////
//////
//////% Motor U9D-D
//////wm = 2*pi/Tm;
//////%we = ;
//////Jm = 3.95E-5*eye(2,2); % Nm      
//////Bm = 0.8*3/(pi*1E3)*eye(2,2);         % Nm/(rad/s)   
//////N = 100*eye(2,2);
//////Fm = 0*[2.8/100;2.8/100];	% Si deseara considerar su efecto, incluirla en el modelo
//////
//////Km=0.076*eye(2);      % Nm/A
//////
//////% Maximos del motor
//////v_max = 6000*RPM;   % [rad/seg]
//////Tau_max = 5.134;       % [Nm]
//////
