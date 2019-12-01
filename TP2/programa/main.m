clear all;
close all;
clc;

#Condiciones físicas del UR5
[ alfa, a, d ] = condicionesIniciales();

graficar=1;%Condicion para graficar en el problema directo. 1=Grafica. 0=No grafica

#Matrices Homogeneas e indices de los angulos propuestos en el Ejercicio 1
[MatHomo0, MatHomo1, MatHomo2, indice0, indice1, indice2]=EjercicioUNO(alfa, a, d,graficar) %Quitar el ; para ver resultados
graficar=0;

#Resultados del problema inverso asociado al Ejercicio 1
[theta0inv, theta1inv, theta2inv, norma0, norma1, norma2] = EjercicioDOSAsociadoUNO(alfa, a, d,MatHomo0, MatHomo1, MatHomo2, indice0, indice1, indice2)
%Quitar el ; para ver resultados

#Angulos testeados
listaThetas = [
	[0; pi/2; pi/2; 0; pi/2; 0]';
	[pi/4; pi/2; pi/2; 0; pi/2; 0]';
	[pi/4; pi/4; pi/2; 0; pi/2; 0]';
	[pi/4; pi/4; pi/6; 0; pi/2; 0]';
	[pi/4; pi/4; pi/6; pi/4; pi/2; 0]';
	[pi/4; pi/4; pi/6; pi/4; pi/4; 0]';
	[pi/4; pi/4; pi/6; 0; pi/2; pi/4]';
	[2*pi/3;-pi/4;-pi/6; -pi/4; pi/4; pi/4]';
	[0;pi/2;pi/2;0;pi/2;0]';
	[-pi/6;	pi/2;pi/2;pi/4;pi/4;pi/4]';
	[-pi/6;	pi/2;pi/2;pi/4;0;pi/4]';
  [ thetaRad] = gradosARadianes([-30, -120, -70, 30, 0, -90])%No me funcionaba el deg2rad :( 
  [ thetaRad] = gradosARadianes([0, 0, 0, 164, 0, 110]);
  [ thetaRad] = gradosARadianes([90, 0, 45, 45, 0, 90]);
  [ thetaRad] = gradosARadianes([180, 35, 45, 135, 0, 8]);
]%Quitar el ; para ver resultados

[ listaThetasInversos] = testeo(listaThetas,a,d,alfa)%Quitar el ; para ver resultados