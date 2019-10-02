function [ angulo ] = DespejeAngulo( num, den, degrad )
% Parametro opcional de entrada [MODO DEG o RAD] (por defecto RAD)
	if ~exist('degrad', 'var')
		degrad = 'RAD';
	end

	angulo = 0;

	if(degrad == 'RAD')
		angulo = atan2(num, den);
	elseif(degrad == 'DEG')
		angulo = rad2deg(atan2(num, den));
	else
		disp('pasa bien los parametros');
	end

end
