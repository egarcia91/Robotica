function [ m0, m1, m2, indice0, indice1, indice2] = EjercicioUNO(alfa, a, d,graficar)
%Se establecen los angulos pedidos en el Ejercicio 1 y se resuelve el problema directo

  %Ángulo para representar la Figura 1 del enunciado
  theta0 = [
  	0;          %theta1
  	-pi/2;      %theta2
  	pi/2;       %theta3
  	pi;         %theta4
  	-pi/2;      %theta5
  	0;          %theta6
  ]
  
  %Ángulos pedidos en el Ejercicio 1
  theta1 = [
  	0;
  	0;
  	0;
  	0;
  	90*pi/180; %conversion de 90grados a radianes
  	0
  ]

  theta2 = [
  	30*pi/180;
  	30*pi/180;
  	30*pi/180;
  	30*pi/180;
  	30*pi/180;
  	30*pi/180;
  ]


  [m0, indice0] = problemadirecto(theta0, a, d, alfa,graficar);
  [m1, indice1] = problemadirecto(theta1, a, d, alfa,graficar);
  [m2, indice2] = problemadirecto(theta2, a, d, alfa,graficar);
  
end