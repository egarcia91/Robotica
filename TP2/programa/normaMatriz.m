function [ norma ] = normaMatriz( theta,a,d,alfa, MH)
%Devuelve la norma entre las matrices

  mnueva = problemadirecto(theta, a, d, alfa,0);
	norma=norm(mnueva - MH);
  
end