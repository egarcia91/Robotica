function [ acum_tr, acum_theta, acum_thetaD, acum_thetap, acum_thetapD, acum_theta2p, acum_theta2pD, acum_u] = simulacion(tacc, Tm, Kp, Kd, Km, theta, thetap, odeOptions, n_ejes, N, tr )
	pasoSimu = 1;

	fprintf('Simulando ');

	for np = 1
		T1 = 0.5;

		tseg = -tacc+Tm;
		while tseg <= T1-tacc
			if mod(pasoSimu,100) == 0
				fprintf('.');
			end

			thetaD = [
				pi/4, pi/4
			]';

			thetapD = zeros(2,1);
			theta2pD = zeros(2,1);

			u = Kp*(thetaD-theta)-Kd*thetap;

			[ tode, X ] = ode45(@modeloDinamico,[0 Tm],[theta;thetap],odeOptions,u);

			theta = X(end, 1:n_ejes)';
			thetap = X(end, n_ejes+1:end)';

			acum_theta(:,pasoSimu) = theta;
			acum_thetap(:,pasoSimu) = thetap;

			if pasoSimu > 1
				acum_theta2p(:,pasoSimu) = (thetap-thetap_ant)/Tm; % modeloDinamico(0,[theta;thetap],u);
			else
				acum_theta2p(:,pasoSimu) = zeros(size(thetap));
			end

			acum_thetaD(:,pasoSimu) = thetaD;
			acum_thetapD(:,pasoSimu) = thetapD;
			acum_theta2pD(:,pasoSimu) = theta2pD;
			acum_u(:,pasoSimu) = Km*N*u;
			acum_tr(:,pasoSimu) = tr;
			thetap_ant = thetap;

			pasoSimu = pasoSimu+1;
			tseg = tseg+Tm;
			tr = tr+Tm;
		end

	end

	fprintf(' OK\n');
end
