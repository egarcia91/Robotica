function [theta0inv, theta1inv, theta2inv, norm0, norm1, norm2 ] = EjercicioDOSAsociadoUNO(alfa, a, d,MH0, MH1, MH2, indice0, indice1, indice2)
%Se resuelve el problema inverso en base a los angulos del Ejercicio 1 
%Ademas se muestra el error entre el angulo deseado y el calculado
   
  theta0inv = problemainverso(MH0, indice0, a, d, alfa);
  theta1inv = problemainverso(MH1, indice1, a, d, alfa);
  theta2inv = problemainverso(MH2, indice2, a, d, alfa);
  
  norm0=normaMatriz(theta0inv,a,d,alfa, MH0);
  norm1=normaMatriz(theta1inv,a,d,alfa, MH1);
  norm2=normaMatriz(theta2inv,a,d,alfa, MH2);

end