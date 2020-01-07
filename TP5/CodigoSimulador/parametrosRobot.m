% Parametros del robot
n_ejes = 2;

global DH;

DH = [
	0.400, 0, 0, 0;
	0.300, 0, 0, 0
];

a1 = DH(1,1);
a2 = DH(2,1);

%Parametros dinamicos del eslabon 1 sin el motor 2 conectado
Igl1zz = 0.07;
Xgl1 = -a1/2;
Ygl1 = 0;
ml1 = 5;

%Parametros dinamicos del eslabon 2 sin la carga util
Igl2zz = 0.015;
Xgl2 = -a2/2;
Ygl2 = 0;
ml2 = 2;
