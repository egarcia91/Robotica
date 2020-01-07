% Parametros del motor
% VALORES del manual de Kollmorgen
global Jm;
global Bm;
global N;
global Fm;
global Km;

Jm = 1E-5*eye(2,2);
Bm = 0.000076*eye(2,2); % Nm/(rad/s)
N = 1*eye(2,2);
Fm = 0 * [
	2.8/100;
	2.8/100
]; % Si deseara considerar su efecto, incluirla en el modelo

Km = 0.1*eye(2); % Nm/A

% Maximos del motor
v_max = 3000*RPM; % [rad/seg]
Tau_max = 1; % [Nm]
