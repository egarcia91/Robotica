function [ rotacion ] = RotacionZ( angulo, degrad )
% Parametros de entrada [phi, MODO DEG o RAD (opcional, por defecto RAD) ]
	if ~exist('degrad', 'var')
		%disp('no se usa modo degrad');
		degrad = 'RAD';
	end
	
	cosAng = 0;
	sinAng = 0;

	if(degrad == 'RAD')
		cosAng = cos(angulo);
		sinAng = sin(angulo);
	elseif(degrad == 'DEG')
		cosAng = cosd(angulo);
		sinAng = sind(angulo);
	else
		disp('pasa bien los parametros');
	end

	rotacion = [
		cosAng, -sinAng, 0;
		sinAng, cosAng, 0;
		0, 0, 1;
	];

end
