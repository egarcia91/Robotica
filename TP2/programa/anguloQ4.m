function [ angulo ] = anguloQ4( q2, q3, q234 )
	%%Calculo de q4
	angulo = 0;

	angulo = q234 - q2 - q3;

	angulo = intervaloAngulo( angulo );
end
