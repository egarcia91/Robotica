function [ angulos ] = EulerInverso( params, degrad, phi_inicial )
% Matriz de entrada de rotacion o objeto con { rotacion, indice}, pordefecto indice en 1
% Parametro opcional de entrada [MODO DEG o RAD] (por defecto RAD)
	if ~exist('degrad', 'var')
		degrad = 'RAD';
	end

	if ~exist('phi_inicial', 'var')
		phi_inicial = 0;
	end

	%%Parametros basicos
	%%
	%% tengo que dar libertad de que entren con una matrix o un objeto con matriz e indice
	[mat, indice] = ParseParams(params);
	%% se terminaron los parametros de entrada

	if(mat(2,3) == 0 && mat(1,3) == 0)

		sPsi = -SinCos(phi_inicial, 'sin', degrad)*mat(1,1) + SinCos(phi_inicial, 'cos', degrad)*mat(2,1);
		cPsi = -SinCos(phi_inicial, 'sin', degrad)*mat(1,2) + SinCos(phi_inicial, 'cos', degrad)*mat(2,2);
		psi = DespejeAngulo(sPsi, cPsi, degrad);

		angulos = [phi_inicial, 0, psi];

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
