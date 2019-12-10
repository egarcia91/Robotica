% **************************************************************
% Parametros del robot
% **************************************************************
n_ejes = 2;
global DH;
DH = [0.400 0 0 0;
    0.300 0 0 0]; 
a1=DH(1,1);
a2=DH(2,1);

%Parametros dinamicos del eslabon 1 sin el motor 2 conectado
Igl1zz = 0.07;
Xgl1=-a1/2;
Ygl1=0;
ml1 = 5;

%Parametros dinamicos del eslabon 2 sin la carga útil
Igl2zz = 0.015;
Xgl2=-a2/2;
Ygl2=0;
ml2 = 2;

% Parámetros dinámicos para el eslabón 1 
% calculados al origen de la terna del eslabón. 
% Cuando se incluyan los motores,  suponer que el motor 2
% está fijado al eslabón 1.
global I01zz Xg1 Yg1 m1;
I01zz = (Igl1zz + ml1 * (Xgl1^2+Ygl1^2));
Xg1 = Xgl1;
Yg1 = Ygl1;
m1 = ml1;

global I02zz Xg2 Yg2 m2;
% Parámetros dinámicos para el eslabón 2, calculados al origen de la terna 2
% Cuando se incluya el efecto de la carga, considerarla colgada en el origen
% de la terna 2.
I02zz = (Igl2zz + ml2 * (Xgl2^2+Ygl2^2)) ;
Xg2 = Xgl2;
Yg2 = Ygl2;
m2 = ml2;

% **************************************************************
% Parametros del motor
% **************************************************************
% VALORES del manual de Kollmorgen
global Jm;
global Bm;
global N;
global Fm;
global Km;

Jm = 1E-5*eye(2,2);      
Bm = 0.000076*eye(2,2);         % Nm/(rad/s)   
N = 1*eye(2,2);
Fm = 0*[2.8/100;2.8/100];	% Si deseara considerar su efecto, incluirla en el modelo

Km=0.10*eye(2);      % Nm/A

% Maximos del motor
v_max = 3000*RPM;   % [rad/seg]
Tau_max = 1;       % [Nm]
