% **************************************************************
% Parametros de la simulacion
% **************************************************************
% Tiempo real
tr = 0;
% Tiempo de muestreo
Tm = 1E-3;    % s
% Tolerancia del integrador. Parametros de la función ode45
odeOptions = odeset('RelTol',0.001,'AbsTol',0.001,'InitialStep',Tm/10,'MaxStep',Tm/5);
