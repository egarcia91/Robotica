function [ angulo ] = anguloQ4( q2, q3, q234, q5 )
	%%Calculo de q4

	angulo = q234 - q2 - q3;

	if(abs(sin(q5)) < 1e-9)
		angulo = angulo;
	end

	angulo = intervaloAngulo( angulo );

end
