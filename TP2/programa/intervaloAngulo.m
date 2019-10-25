function [ angulo ] = intervaloAngulo( q )

	angulo = q;

	if(abs(angulo) > pi)
		angulo = angulo - sign(angulo)*2*pi;
	end

end
