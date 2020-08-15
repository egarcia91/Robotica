(function(){
	function ControlPD(){
	}

	ControlPD.prototype.constructor = "ControlPD";
	ControlPD.prototype.constanteProporcional = 0;
	ControlPD.prototype.constanteDerivativa = 0;
	ControlPD.prototype.toleranciaMotorMaxima = 0;

	ControlPD.prototype.accionar = function(thetaDeseado1, thetaDeseado2, constantes, theta, thetap){

		var kp = constantes.kp;
		var kd = constantes.kd;
		var km = constantes.km;
		this.toleranciaMotorMaxima = constantes.tauMax;

		var thetaD1 = thetaDeseado1;
		var thetaD2 = thetaDeseado2;

		this.constanteProporcional = kp;
		this.constanteDerivativa = kd;

		var kp1 = kp["1"];
		var kp2 = kp["2"];

		var kd1 = kd["1"];
		var kd2 = kd["2"];


		var theta1 = theta["1"];
		var theta2 = theta["2"];
		var thetap1 = thetap["1"];
		var thetap2 = thetap["2"];

		var u1 = kp1*(thetaD1-theta1)-kd1*thetap1;
		var u2 = kp2*(thetaD2-theta2)-kd2*thetap2;

		var toleranciaMotor1 = km*u1;
		var toleranciaMotor2 = km*u2;

		if(this.saturaMorot(toleranciaMotor1)){
				u1 = math.sign(u1)*this.toleranciaMotorMaxima/km;
		}

		if(this.saturaMorot(toleranciaMotor2)){
				u2 = math.sign(u2)*this.toleranciaMotorMaxima/km;
		}

		return {
			u1 : u1,
			u2 : u2
		}
//		this.resolverEcuacionDiferencialOrdinaria();
//
//		this.lectorEncoder();
	};

	ControlPD.prototype.lectorEncoder = function(toleranciaMotor){
//		theta=X(end, 1:n_ejes)';
//		thetap=X(end, n_ejes+1:end)';
	};

	ControlPD.prototype.saturaMorot = function(toleranciaMotor){

		var seSatura = false;

		if(math.abs(toleranciaMotor) > this.toleranciaMotorMaxima){
			seSatura = true;
		}

		return seSatura;
	};

	ControlPD.prototype.resolverEcuacionDiferencialOrdinaria = function(u, theta, thetap){
		var modeloDinamico;
		var odeOptions;
		var tm;

		var res = ode45(modeloDinamico,[0, tm],[theta,thetap],odeOptions,u);
		res.tode;
		res.x;

	};

	window.ControlPD = ControlPD;
})();
