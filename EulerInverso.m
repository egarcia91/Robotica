function [ angulos ] = EulerInverso( params, degrad )
% Matriz de entrada de rotacion o objeto con { rotacion, indice}, pordefecto indice en 1
% Parametro opcional de entrada [MODO DEG o RAD] (por defecto RAD)
	if ~exist('degrad', 'var')
		degrad = 'RAD';
	end

	mat = zeros(3,3);
	indice = 1;

	dim = size(params);

	if(dim(1) == 3 && dim(2) == 3)
		mat = params;
	elseif(dim(1) == 2 && dim(2) == 1)
		tmp = cell2mat(params(1));
		dimM = size(tmp);
		if(dimM(1) == 3 && dimM(2) == 3)
			mat = tmp;
		else
			disp('pasa bien los parametros');
		end

		tmp = cell2mat(params(2));
		dimM = size(tmp);
		if(dimM(1) == 1 && dimM(2) == 1)
			indice = tmp;
		else
			disp('pasa bien los parametros');
		end
	else
		disp('pasa bien los parametros');
	end

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
