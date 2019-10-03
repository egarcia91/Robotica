function [ angulo ] = SinCos( value, sincos, degrad )
% Parametro opcional de entrada [MODO DEG o RAD] (por defecto RAD)
	if ~exist('degrad', 'var')
		degrad = 'RAD';
	end

	if ~exist('sincos', 'var')
		sincos = 'sin';
	end

	angulo = 0;

	if(degrad == 'RAD')
		if(sincos == 'sin')
			angulo = sin(value);
		elseif(sincos == 'cos')
			angulo = cos(value);
		else
			disp('pasa bien los parametros');
		end
	elseif(degrad == 'DEG')
		if(sincos == 'sin')
			angulo = sind(value);
		elseif(sincos == 'cos')
			angulo = cosd(value);
		else
			disp('pasa bien los parametros');
		end
	else
		disp('pasa bien los parametros');
	end

end
