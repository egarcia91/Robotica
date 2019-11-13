function [ angulo ] = intervaloAngulo( q )

	angulo = q;

	if(abs(angulo) > pi)
		angulo = angulo - sign(angulo)*2*pi;
	end
	if(abs(q) < 1e-9)
    		angulo=0;
	end
end
