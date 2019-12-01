function [ angulo ] = intervaloAngulo( q )
%Intervalo de angulo en los que funciona el modelo
	angulo = q;

	if(abs(angulo) > pi)
		angulo = angulo - sign(angulo)*2*pi;
	end

	if(abs(angulo) < 1e-6)
		angulo = 0;
	end

end
