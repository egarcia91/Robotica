function [ angulos ] = EulerInverso( params, degrad, phi_inicial )
% Matriz de entrada de rotacion o objeto con { rotacion, indice}, pordefecto indice en 1
% Parametro opcional de entrada [MODO DEG o RAD] (por defecto RAD)
	if ~exist('degrad', 'var')
		degrad = 'RAD';
	end

	if ~exist('phi_inicial', 'var')
		phi_inicial = 0;
	end

	tolerancia = 1e-6;
	%%Parametros basicos
	%%
	%% tengo que dar libertad de que entren con una matrix o un objeto con matriz e indice
	[mat, indice] = ParseParams(params);
	%% se terminaron los parametros de entrada

	if((abs(mat(2,3)) < tolerancia) && (abs(mat(1,3)) < tolerancia))

		phi = phi_inicial;

	else

		phi = DespejeAngulo(indice*mat(2,3),indice*mat(1,3), degrad);

	end

	sPsi = -SinCos(phi, 'sin', degrad)*mat(1,1) + SinCos(phi, 'cos', degrad)*mat(2,1);
	cPsi = -SinCos(phi, 'sin', degrad)*mat(1,2) + SinCos(phi, 'cos', degrad)*mat(2,2);
	psi = DespejeAngulo(sPsi, cPsi, degrad);

	cTheta = mat(3,3);
	sTheta = SinCos(phi, 'cos', degrad)*mat(1,3) + SinCos(phi, 'sin', degrad)*mat(2,3);
	theta = DespejeAngulo(sTheta, cTheta, degrad);

	angulos = [phi, theta, psi];

end
