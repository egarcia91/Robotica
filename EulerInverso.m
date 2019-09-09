function [ angulos ] = EulerInverso( params, degrad )
% Matriz de entrada de rotacion
% Parametro opcional de entrada [MODO DEG o RAD] (por defecto RAD)
	if ~exist('degrad', 'var')
		degrad = 'RAD';
	end

	mat = zeros(3,3);

	dim = size(params);
	disp(dim);
	disp(dim(1));
	disp(dim(2));

	if(dim(1) == 3 && dim(2) == 3)
		mat = params;
	elseif(dim(1) == 2 && dim(2) == 1)
		dimM = size(params(1));
		disp('vengo por aca')
		disp(dim(1));
		disp(dim(2));
		if(dimM(1) == 3 && dimM(2) == 3)
			disp('paseee')
			mat = params(1);
		end
	else
		disp('pasa bien los parametros');
	end

%		dimInd = size(sparams(2);
%	disp(params(1));
%	disp(params(2));
%	disp(mat);
%	dim = size(params);
%	if(dim(1) == 3 && dim(2) == 3)
%		mat = params;
%	else
%		disp('pasa bien los parametros');
%	end
%
%	disp(mat);
%
%	cTheta = mat(3,3);
%
%	theta = DespejeAngulo(cTheta, 'cos', degrad);
%
%	sTheta = sqrt(mat(2,3)*mat(2,3)+mat(1,3)*mat(1,3));
%
%	cPhi = 0;
%	sPsi = 0;
%
%	if(sTheta != 0)
%		cPhi = mat(1,3)/sTheta;
%		sPsi = mat(3,2)/sTheta;
%	end
%
%	phi = DespejeAngulo(cPhi, 'cos', degrad);
%	psi = DespejeAngulo(sPsi, 'sin', degrad);
%
%	angulos = [phi, theta, psi];

end
