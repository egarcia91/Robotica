function [ n, o, a, p ] = noapVector( transformationMatrix)
%Devuelve los componentes generales del problema inverso

	filaIni = 1;
	filaFin = 3;

	n = orientacionTCP(transformationMatrix(filaIni:filaFin,1));

	o = orientacionTCP(transformationMatrix(filaIni:filaFin,2));

	a = orientacionTCP(transformationMatrix(filaIni:filaFin,3));

	p = orientacionTCP(transformationMatrix(filaIni:filaFin,4));

end
