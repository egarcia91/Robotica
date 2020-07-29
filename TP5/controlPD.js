(function(){
	function ControlPD(div,config){
	}

	ControlPD.prototype.constructor = "ControlPD";
	ControlPD.prototype.constanteProporcional = 0;
	ControlPD.prototype.constanteDerivativa = 0;
	ControlPD.prototype.constanteMotor = 0;
	ControlPD.prototype.toleranciaMotorMaxima = 0;

	ControlPD.prototype.accionar = function(thetaDeseado){

		var thetaD = thetaDeseado;

		var kp = this.constanteProporcional;
		var kd = this.constanteDerivativa;
		var theta;
		var thetap;

		var u = kp*(thetaD-theta)-kd*thetap;
		var largo = u.length;

		var km = this.constanteMotor;

		var toleranciaMotor = km*u;

		for(var i = 0; i < largo; i++){
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
		var modeloDinamico;
		var odeOptions;
		var tm;

		var res = ode45(modeloDinamico,[0, tm],[theta,thetap],odeOptions,u);
		res.tode;
		res.x;

	};

	ControlPD.prototype.modeloDinamico = function(tiempo, x, u){

		var N;
		var Jm;
		var Bm;
		var Km;

		var torquq = Km*N*u;
		var n_ejes = length(Torq);
//		[M,H,G] = calcMatrizDinamica(x);
//
//		thetap = x(n_ejes+1:end);
//		theta2p = (M+Jm*N^2)\( Torq -Bm*N^2*thetap -H -G);
//		dxdt = [thetap; theta2p];
	}

	window.ControlPD = ControlPD;
})();
