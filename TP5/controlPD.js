(function(){
	function ControlPD(div,config){
	}

	ControlPD.prototype.constructor = "ControlPD";
	ControlPD.prototype.constanteProporcional = 0;
	ControlPD.prototype.constanteDerivativa = 0;
	ControlPD.prototype.constanteMotor = 0;
	ControlPD.prototype.toleranciaMotorMaxima = 0;

	ControlPD.prototype.accionar = function(thetaDeseado, thetaActual, thetapActual){

		var theta;
		var thetap;
		var thetaD = thetaDeseado;

		var kp = this.constanteProporcional;
		var kd = this.constanteDerivativa;
		var u = kp*(thetaD-theta)-kd*thetap;
		var largo = u.length;

		var km = this.constanteMotor;

		for(var i = 0; i < largo; i++){
			var toleranciaMotor = km[i][i]*u[i];
			if(this.saturaMorot(toleranciaMotor)){
				u[i] = math.sign(u[i])*this.toleranciaMotorMaxima/(km[i][i]);
			}
		}

		this.resolverEcuacionDiferencialOrdinaria();

		this.lectorEncoder();
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
		var odeOptions;
		var tm;

//		var res = ode45(modeloDinamico,[0, tm],[theta,thetap],odeOptions,u);
		res.tode;
		res.x;

	};

	window.ControlPD = ControlPD;
})();
