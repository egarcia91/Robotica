clear all;
close all;
clc;

%Condiciones fisicas del UR5
[ alfa, a, d ] = condicionesIniciales();

%%%%%%%%%%%%%%%%% Analisis numerico de singularidades %%%%%%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%% de mu�eca y codo con det(Jacobiano) %%%%%%%%%%%%%%%%%%%%%%

%Condiciones de testeo
Ntest=20;
tol_min=1e-16;

%Posiciones que generan el nul a partir del determianante del Jacobiano
AngulosJaco=BusquedaNulJacobiano( a,d,Ntest,tol_min );
%sacar el ; para analizar los angulos que anulan el det(Jacobiano)

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%Obs: no depende de q2 y q4, solo de q3=n*PI y q5=n*PI
%demostrando los valores para la singularidad de la mu�eca y el codo
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

ThetaCodo=[ 0; -13; 0; -90; -90; 10];
fprintf('\n\nSingularidad Codo:\n\n');
SingularidadCodoMunieca( ThetaCodo,a,d );

ThetaMunieca=[ 0; -45; 45; -90; 0; 90];
fprintf('Singularidad Munieca:\n\n');
SingularidadCodoMunieca( ThetaMunieca,a,d );

%%
%%%%%%%%%%%%%% Analisis numerico de singularidad de brazo %%%%%%%%%%%%%%%%%
%%%%%%%%%%%%%%%%%%%%%%%% con un punto singular %%%%%%%%%%%%%%%%%%%%%%%%%%%%

%En el simulador Robot DK ubicamos el robot en la posici�n de la
%singularidad del brazo y obtuvimos, en base a la posici�n y la direcci�n 
%de la terna del TCP, la siguiente matriz de rototraslacion con su indice

R=[ 0 -1 0 -12.26372;
    0 0 1 35.5;
    -1 0 0 429.18915;
    0 0 0 1];
indice=[-1,-1,1];

fprintf('Singularidad Brazo:\n\n');
singularidadBrazo( a, d, alfa, R, indice );

%%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%Conclusiones: 
%-El nucleo de J nos da ejes que no producen velocidad en la mu�eca.
%-El nucleo de J transp nos da las direcciones en las que no puede moverse.
%-Para salir de la singularidad de la mu�eca se deber�a mover el eje 5.
%-Para salir de la singularidad del codo se deber�a mover el eje 3.
%-Para salir de la singularidad del brazo se deber�a mover el eje 2 o el 3.
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
