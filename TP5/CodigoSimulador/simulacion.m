function [] = simulacion(tacc, Tm, Kp, Kd, theta, thetap, odeOptions, n_ejes )
	pasoSimu = 1;

	% Voy a procesar cada una de las instrucciones de movimiento
	fprintf('Simulando ');
	% Iteración por todos los puntos destinos
	%for np=2:size(pdest,2)
	for np = 1
		% Calculo los objetivos del nuevo segmento
		%thetaC = pinvScara(pdest(:,np));
		%DC=thetaC-thetaB;

		% Se calcula tiempo de segmento
		%T1 = max([max(DC./v_max ),TDeseado(np),2*tacc]);
		T1 = 0.5;

		% Calculo el segmento
		tseg = -tacc+Tm;
		while tseg <= T1-tacc
			% Indicador de progreso ->
			if mod(pasoSimu,100) == 0
				fprintf('.');
			end

			% Obtengo la siguiente referencia usando la función
			% generadorTrayectoriaJoint 
			%[thetaD thetapD theta2pD] = interpoladorTrapezoidal(thetaA,thetaB,thetaC,T1,tseg,tacc);
			thetaD = [
				pi/4, pi/4
			]';

			thetapD = zeros(2,1);
			theta2pD = zeros(2,1);

			% Calculo el torque de control. En este caso es un PD con
			% compensación por peso propio
			u = Kp*(thetaD-theta)-Kd*thetap;

			% Integro numericamente sobre el modelo completo de la planta      			
			% modeloDinamico es una funcion definida en un script de la siguiente
			% manera: 
			% function dXdt = modeloDinamico(t,X,Torq)
			% Donde t es el tiempo
			% X es el vector de estados, es decir [theta;thetap]
			% Torq es el vector con el torque de entrada
			% Devuelve la derivada del vector de estados (dXdt) que es lo que se
			% debe integrar 
			% Notar que la acción de control se bloquea durante Tm (es como tener
			% un retenedor de orden cero o ZOH)
			[ tode, X ] = ode45(@modeloDinamico,[0 Tm],[theta;thetap],odeOptions,u);

			% Lectura de encoder y tacogenerador a partir del modelo integrado
			theta = X(end, 1:n_ejes)';
			thetap = X(end, n_ejes+1:end)';

			% Acumulo las variables para poder graficarlas luego
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

			% Proximo paso de simulacion
			pasoSimu = pasoSimu+1;
			% Calculo el proximo tiempo de segmento
			tseg = tseg+Tm;
			% Almaceno el proximo tiempo real de la simulación
			tr = tr+Tm;
		end

		% Asignaciones de referencias para calcular el próximo segmento
		%thetaA=thetaD;
		%thetaB=thetaC;
	end

	fprintf(' OK\n');
end
