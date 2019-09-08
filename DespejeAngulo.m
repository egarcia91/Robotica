function [ angulo ] = DespejeAngulo( value, sincos, degrad )
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
			angulo = asin(value);
		elseif(sincos == 'cos')
			angulo = acos(value);
		else
			disp('pasa bien los parametros');
		end
	elseif(degrad == 'DEG')
		if(sincos == 'sin')
			angulo = asind(value);
		elseif(sincos == 'cos')
			angulo = acosd(value);
		else
			disp('pasa bien los parametros');
		end
	else
		disp('pasa bien los parametros');
	end

end
