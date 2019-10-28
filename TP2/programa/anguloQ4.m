function [ angulo ] = anguloQ4( q23, q234 )
	%%Calculo de q4

	angulo = q234 - q23;

	angulo = intervaloAngulo( angulo );
end
