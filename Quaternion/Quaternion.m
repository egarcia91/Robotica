function [ respuesta ] = Quaternion( angulo, vector, degrad )
% Voy a trabajar los Cuaterniones
% angulo de entrada theta
% Vector de entrada [x, y, z]
% Parametro opcional de entrada [MODO DEG o RAD] (por defecto RAD)

	if ~exist('degrad', 'var')
		degrad = 'RAD';
	end

	dim = size(vector);
	vec = [0, 0, 0]';
	if(dim(1) == 3 && dim(2) == 1)
		vec = vector;
	elseif(dim(1) == 1 && dim(2) == 3)
		vec = vector';
	else
		disp('pasa bien los parametros');
	end

	norma = sqrt(vector(1)*vector(1) + vector(2)*vector(2) + vector(3)*vector(3));

	vec = vec/norma;


	theta = angulo;

	alfa = SinCos(theta/2, 'sin', degrad);

	w = SinCos(theta/2, 'cos', degrad);

	respuesta = [w, vec'*alfa];

	respuesta*respuesta'

end
