clear all
close all

format long g

angulosIniciales = [pi/2, pi/2, pi/2];

angulosFinales = EulerInverso(EulerDirecto(angulosIniciales));

disp('Va la comparacion del Angulo Inicial y el Final');
disp(isequal(angulosIniciales,angulosFinales));

matrizInicial = [
	1, 0, 0;
	0, 0, 1;
	0, -1, 0
];

matrizFinal = EulerDirecto(EulerInverso(matrizInicial));
disp(matrizFinal);

disp('Va la comparacion de la matriz Inicial y el Final');
disp(isequal(matrizInicial, matrizFinal));


