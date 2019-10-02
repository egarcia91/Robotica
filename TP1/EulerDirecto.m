function [ respuesta ] = EulerDirecto( angulos, degrad )
% Vector de entrada [phi, theta, psi]
% Parametro opcional de entrada [MODO DEG o RAD] (por defecto RAD)
	if ~exist('degrad', 'var')
		degrad = 'RAD';
	end

	dim = size(angulos);
	ang = [0, 0, 0]';
	if(dim(1) == 3 && dim(2) == 1)
		ang = angulos;
	elseif(dim(1) == 1 && dim(2) == 3)
		ang = angulos';
	else
		disp('pasa bien los parametros');
	end

	phi = ang(1);
	theta = ang(2);
	psi = ang(3);

	matRotZPhi = RotacionZ(phi, degrad);
	matRotYTheta = RotacionY(theta, degrad);
	matRotZPsi = RotacionZ(psi, degrad);

	rotacion = matRotZPhi*matRotYTheta*matRotZPsi;

	%indiceSign = sign(atan2(matRotZPhi(2,1),matRotZPhi(1,1)));
	indiceSign = sign(theta);

	respuesta = {
		rotacion,
		indiceSign
	};
end
