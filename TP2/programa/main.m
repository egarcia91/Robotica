clear all;
close all;
clc;

%%%%%Condiciones iniciales
%%%%theta0 = [
%%%%	0;          %theta1
%%%%	-pi/2;      %theta2
%%%%	pi/2;       %theta3
%%%%	pi;         %theta4
%%%%	-pi/2;      %theta5
%%%%	0;          %theta6
%%%%];
%%%%
%%%%theta1 = [
%%%%	0;
%%%%	0;
%%%%	0;
%%%%	0;
%%%%	90*pi/180; %conversion de 90grados a radianes
%%%%	0
%%%%];
%%%%
%%%%theta2 = [
%%%%	30*pi/180;
%%%%	30*pi/180;
%%%%	30*pi/180;
%%%%	30*pi/180;
%%%%	30*pi/180;
%%%%	30*pi/180;
%%%%];

a = [
	0;
	-0.5;
	-0.4;
	0;
	0;
	0;
];

d = [
	0.1;
	0;
	0;
	0.1;
	0.1;
	0.08;
];

%theta = [
%	0;
%	pi/2;
%	pi/2;
%	0;
%	pi/2;
%	0;
%]

listaThetas = [
	[0; pi/2; pi/2; 0; pi/2; 0]';
	[pi/4; pi/2; pi/2; 0; pi/2; 0]';
	[pi/4; pi/4; pi/2; 0; pi/2; 0]';
	[pi/4; pi/4; 6*pi/8; 0; pi/2; 0]';
	[pi/4; pi/4; pi/2; pi/4; pi/2; 0]';
	[pi/4; pi/4; pi/2; 0; pi/2; pi/4]'
];

theta = [
	pi/4;
	pi/4;
	pi/2;
	0;
	pi/2;
	pi/4;
];


alfa = [
	pi/2;
	0;
	0;
	pi/2;
	-pi/2;
	0;
];

for k = 1:6

	[m, indice] = problemadirecto(listaThetas(k, :)', a, d, alfa);

	for i = 1:3
		for j=1:3
			if(abs(m(i,j)) < 1e-9)
				m(i,j) = 0;
			end
		end
	end

	%m
	%m = fix(m*100)/100;

	thetaNuevo = problemainverso(m, indice, a, d, alfa);

	mnueva = problemadirecto(thetaNuevo, a, d, alfa);

	norm(mnueva - m);

	MostrarTablaFinal(listaThetas(k, :)', m, a, d, alfa, indice);
end
%display('Matriz transformada para theta0');
%[ TransformadaA0, iter ] = problemadirecto(theta0)

%display('Matriz transformada para theta1');
%[ TransformadaA1, iter ] = problemadirecto(theta1)

%display('Matriz transformada para theta2');
%[ TransformadaA2, iter ] = problemadirecto(theta2)

