clear all;
close all;
clc;

%Condiciones iniciales
theta0=[
  0;          %theta1
	-pi/2;      %theta2
  pi/2;       %theta3
	pi;         %theta4
	-pi/2;      %theta5
  0;          %theta6
];

theta1=[
  0;
  0;
  0;
  0;
  90*pi/180; %conversion de 90grados a radianes
  0
];   

theta2=[
  30*pi/180;
  30*pi/180;
  30*pi/180;
  30*pi/180;
  30*pi/180;
  30*pi/180;
];   

display('Matriz transformada para theta0');
TransformadaA0=problemadirecto(theta0)

display('Matriz transformada para theta1');
TransformadaA1=problemadirecto(theta1)

display('Matriz transformada para theta2');
TransformadaA2=problemadirecto(theta2)

