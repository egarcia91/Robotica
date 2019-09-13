function [ angulos ] = EulerInverso( params, degrad )
% Matriz de entrada de rotacion o objeto con { rotacion, indice}, pordefecto indice en 1
% Parametro opcional de entrada [MODO DEG o RAD] (por defecto RAD)
	if ~exist('degrad', 'var')
		degrad = 'RAD';
	end

	%%Parametros basicos
	%%
	mat = zeros(3,3);
	indice = 1;

	%% tengo que dar libertad de que entren con una matrix o un objeto con matriz e indice
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
	%% se terminaron los parametros de entrada

	if(indice == 0)
		angulos = [0, 0, 0];
	else

		cTheta = mat(3,3);
		sTheta = sqrt(mat(2,3)*mat(2,3)+mat(1,3)*mat(1,3))*indice;
		theta = DespejeAngulo(sTheta, cTheta, degrad);

		cPhi = 0;
		sPsi = 0;

		phi = DespejeAngulo(indice*mat(2,3),indice*mat(1,3), degrad);
		psi = DespejeAngulo(indice*mat(3,2), indice*-mat(3,1), degrad);

		angulos = [phi, theta, psi];

	end

end
