function [ rotacion, indiceSign ] = EulerInverso( Rot, degrad )
% Matriz de entrada de rotacion
% Parametro opcional de entrada [MODO DEG o RAD] (por defecto RAD)
	if ~exist('degrad', 'var')
		degrad = 'RAD';
	end

	dim = size(Rot);
	if(dim(1) == 3 && dim(2) == 3)
		mat = Rot;
	else
		disp('pasa bien los parametros');
	end

	disp(mat);

	if(degrad == 'RAD')
		cosAng = cos(angulo);
		sinAng = sin(angulo);
	elseif(degrad == 'DEG')
		cosAng = cosd(angulo);
		sinAng = sind(angulo);
	else
		disp('pasa bien los parametros');
	end


	mat(3,3)

	matRotZPhi = RotacionZ(phi, degrad);
	matRotYTheta = RotacionY(theta, degrad);
	matRotZPsi = RotacionZ(psi, degrad);

	rotacion = matRotZPhi*matRotYTheta*matRotZPsi;

	indiceSign = sign(atan2(matRotZPhi(2,1),matRotZPhi(1,1)));

end
