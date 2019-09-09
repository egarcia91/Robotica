function [ angulos ] = EulerInverso( Rot, degrad )
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

	cTheta = mat(3,3);

	theta = DespejeAngulo(cTheta, 'cos', degrad);

	sTheta = sqrt(mat(2,3)*mat(2,3)+mat(1,3)*mat(1,3));

	cPhi = 0;
	sPsi = 0;

	if(sTheta != 0)
		cPhi = mat(1,3)/sTheta;
		sPsi = mat(3,2)/sTheta;
	end

	phi = DespejeAngulo(cPhi, 'cos', degrad);
	psi = DespejeAngulo(sPsi, 'sin', degrad);

	angulos = [phi, theta, psi];

end
