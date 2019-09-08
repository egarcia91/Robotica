function [ rotacion, indiceSign ] = EulerDirecto( angulos, degrad )
% Vector de entrada [phi, theta, psi]
% Parametro opcional de entrada [MODO DEG o RAD] (por defecto RAD)
	if ~exist('degrad', 'var')
		degrad = 'RAD';
	end

	dim = size(angulos);
	resp = [0, 0, 0]';
	if(dim(1) == 3 && dim(2) == 1)
		resp = angulos;
	elseif(dim(1) == 1 && dim(2) == 3)
		resp = angulos';
	else
		disp('pasa bien los parametros');
	end

	disp(resp);

	rotacion = RotacionZ(angulos(1), degrad)*RotacionY(angulos(2), degrad)*RotacionZ( angulos(3), degrad);

	indiceSign = 1;


end
