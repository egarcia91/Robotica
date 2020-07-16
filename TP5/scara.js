(function(){
	function Scara(div,config){
	}

	Scara.prototype.constructor = "Scara";
	Scara.prototype.largoEslabon1 = 400;
	Scara.prototype.largoEslabon2 = 300;

	Scara.prototype.problemaInverso = function(x, y, z, g){
		// pose = [x,y,z,g]'; siendo g el indice de configuracion.

		// Parametros del doble pendulo
		var a1 = this.largoEslabon1; //[mm]
		var a2 = this.largoEslabon2; //[mm]

		var c2 = (x*x + y*y -a1*a1 -a2*a2)/(2*a1*a2);

		var theta1 = undefined;
		var theta2 = undefined;

		if( math.abs(c2) <= 1){
			var s2 = g*math.sqrt(1-c2*c2);
			theta2 = math.atan2(s2,c2);

			//A x = b

			//|a1+a2.c2 -a2.s2   | |c1|   | x |
			//|a2.s2     a1+a2.c2| |s1| = | y |

			var factor = (a2*s2)/(a1 + a2*c2);
			var s1 = (y - x*factor)/((a1 + a2*c2) - factor*(a2*s2));
			var c1 = (x/(a1 + a2*c2)) + s1*factor;
			theta1 = math.atan2(s1,c1);
		}

		return {
			'theta1' : theta1,
			'theta2' : theta2
		};
	};


	window.Scara = Scara;
})();


